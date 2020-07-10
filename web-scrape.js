const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const result = [];
const base = 'https://www.mypetchicken.com/chicken-breeds'
const mainPageUrl = `${base}/breed-list.aspx`
const selectorMap = {
	mainPage: { links: 'a[id^="contentMasterPage_dataListBreeds_HLBreed_"]' },
	subPage: {
		breed: '#contentMasterPage_FVChicken td h1',
		description: '#contentMasterPage_FVChicken td > div > p',
		images: 'a[id^="contentMasterPage_FVChicken_DLpics_HLChickenPic_"]',
		classDescription: '#contentMasterPage_FVChicken_classDesc',
		type: '#contentMasterPage_FVChicken_typeDesc',
		size: '#contentMasterPage_FVChicken_sizeDesc',
		rarity: '#contentMasterPage_FVChicken_rarityDesc',
		purpose: '#contentMasterPage_FVChicken_purposeDesc',
		varieties: '#contentMasterPage_FVChicken_colors',
		eggLaying: '#contentMasterPage_FVChicken_eggLayingDesc',
		eggColor: '#contentMasterPage_FVChicken_eggColorDesc',
		eggSize: '#contentMasterPage_FVChicken_eggSizeDesc',
		combType: '#contentMasterPage_FVChicken_combDesc',
		crested: '#contentMasterPage_FVChicken_crested',
		featheredLegs: '#contentMasterPage_FVChicken_featheredFeet',
		numToes: '#contentMasterPage_FVChicken_numToes',
		winterHardiness: '#contentMasterPage_FVChicken_hardyInWinter',
		heatTolerance: '#contentMasterPage_FVChicken_Label1',
		bearsConfinement: '#contentMasterPage_FVChicken_confinementDesc',
		docility: '#contentMasterPage_FVChicken_docile',
		broody: '#contentMasterPage_FVChicken_setter',
		personality: '#contentMasterPage_FVChicken_personality'
	}
}

const scrapePage = (url, callback) => {
	axios.get(url)
		.then(resp => callback(cheerio.load(resp.data)))
		.catch(error => console.log(error))
}

const buildData = url => {
	return new Promise(resolve => {
		scrapePage(url, $ => {
			const { subPage } = selectorMap
			const obj = {}

			Object.keys(subPage).map(key => {
				let value = null

				if (key === 'images') {
					value = []

					$(subPage[key]).map(function() {
						const image = ($(this).attr('onmouseover')
							.match(/([\/\w|\s|-])*\L.(?:jpg|gif|png)/g) || [])[0]

						image && value.push(`${base.replace('chicken-breeds', '')}${image}`)
					})
				} else {
					value = $(subPage[key]).text().trim()
				}

				obj[key] = value
			})

			return resolve(obj)
		})
	})
}

scrapePage(mainPageUrl, async ($) => {
	const { links } = selectorMap.mainPage

	$(links).each(function(i) {
    setTimeout(async () => {
    	const len = $(links).length - 1
    	console.log(`fetching ${$(this).attr('href')} (${i}/${len})`)
  		const chicken = await buildData(`${base}/${$(this).attr('href')}`)

			result.push(chicken)

			if (i === len) {
				fs.rename('./src/data/chicken-stats.json', './src/data/chicken-stats-BACKUP.json', err => {
					if ( err ) console.log(`ERROR: ${err}`)
				})
				fs.writeFileSync('./src/data/chicken-stats.json', JSON.stringify(result, null, 2))
			}
    }, i * 500)
	}) 
})