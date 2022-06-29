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
            const data = await fetch("https://type.fit/api/quotes")
                                .then(response => response.json())
                                .catch(error => {console.error("There was a problem with the fetch request", error)})
            const element = data[Math.floor(Math.random()*data.length)];
            console.log(element);

            this.quote = '"' + element.text + '"'
            this.author = (element.author != null) ? "- " + element.author : "- Unknown Author"
            this.picture = "";

            //Get Picture
            if(element.author != null) {
                query = element.author.replace(" ","%20")
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '75b9c833cfmsh5384228b6c17420p12c45ajsna4677f86d813',
                        'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
                    }
                };
                
                fetch('https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=' + query + '&pageNumber=1&pageSize=1&autoCorrect=false', options)
                    .then(response => response.json())
                    .then(data => {this.picture = data.value[0].url})
                    .catch(error => {console.error("There was a problem with the fetch request", error)})
            }

        }
    }

})

app.mount("#app")