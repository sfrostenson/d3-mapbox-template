GENERATED_FILES = \
	counties.json

# tells Make which targets are not files.
.PHONY: all clean

all: $(GENERATED_FILES)

clean:
	rm -rf -- $(GENERATED_FILES) topo

# downloading the source files
topo/%.tar.gz:
	mkdir -p $(dir $@)
	curl -o $@ 'http://dds.cr.usgs.gov/pub/data/nationalatlas/$(notdir $@)'

# unzipping our source files
topo/counties-unfiltered.shp: topo/countyp010_nt00795.tar.gz
	@rm -rf -- $(basename $@)
	mkdir -p $(basename $@)
	tar -xzm -C $(basename $@) -f $<
	for file in `find $(basename $@) -type f`; do chmod 644 $$file; mv $$file $(basename $@).$${file##*.}; done
	rm -rf -- $(basename $@)

# this removes lakes from the shapefile
topo/counties.shp: topo/counties-unfiltered.shp
	@rm -f -- $@
	ogr2ogr -f 'ESRI Shapefile' -where "FIPS NOT LIKE '%000'" $@ $<

# here we add in our csv data and set simplification params
bin/counties.json: topo/counties.shp
	node_modules/.bin/topojson \
		-o $@ \
		--no-pre-quantization \
		--post-quantization=1e6 \
		--simplify=7e-7 \
		-e bin/unemployment-clean.csv \
		-p r=+rate,c=c,s=s \
		--id-property=FIPS \
		-- topo/counties.shp