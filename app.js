const app = Vue.createApp({
    data() {
        return {
            quote: '"And those who were seen dancing were thought to be insane by those who could not hear the music"',
            author: "- Friedrich Nietzsche",
            picture: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche187a.jpg"
        }
    },
    methods: {
        async getQuote() {

            // Get Random Quote
            const res = await fetch("https://type.fit/api/quotes")
            const data = await res.json()
            const element = data[Math.floor(Math.random()*data.length)];

            //Get Picture
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '75b9c833cfmsh5384228b6c17420p12c45ajsna4677f86d813',
                    'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
                }
            };
            
            query = element.author.replace(" ","%20")
            const res2 = await fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=' + query + '&pageNumber=1&pageSize=1&autoCorrect=false', options)
            const data2 = await res2.json()

            //Set Data
            this.picture = data2.value[0].url
            this.quote = '"' + element.text + '"'
            this.author = "-" + element.author

            //Fix Picture
            var img = document.getElementById("author-picture")
            console.log(img.clientWidth)
            console.log(img.clientHeight)
            if(img.offsetWidth >= img.offsetHeight) {
                console.log("1")
                img.style.width = "100%"
                img.style.height = "auto"
            } else {
                console.log("2")
                img.style.width = "auto"
                img.style.height = "100%"
            }
        }
    }

})

app.mount("#app")