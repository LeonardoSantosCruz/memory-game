(function(){
    let matches = 0
    let images = []
    let flippedCards = []
    let modalGameOver = document.querySelector("#modalGameOver")
    let imgMatchsign = document.querySelector("#imgMatchSign")
    for(i=0;i<12;i++){
        let img=  {
            src:"imagens/"+ i + ".png",
            id : i%6
        }
        images.push(img)
    }
    
    startGame()



    function startGame(){
        matches = 0

        flippedCards = []

        images = randomSort(images)

        let frontFaces = document.getElementsByClassName("front")
        let backFaces = document.getElementsByClassName("back")

        for(i = 0 ; i<frontFaces.length ; i++){
            frontFaces[i].classList.remove('flipped', 'match')
            backFaces[i].classList.remove('flipped', 'match')

            let cardPosition = document.querySelector("#card_" + i)
            cardPosition.style.left = i % 6 == 0 ? 5 + "px" : i % 6  * 205 + 5 + "px" 
            cardPosition.style.top = i < 6 ? 5 + "px" : 310 + "px"
            
            cardPosition.addEventListener("click", flipCard, false)
            const imagem = "url('"+ images[i].src +"')"
            frontFaces[i].style.background = imagem
            frontFaces[i].setAttribute("id",images[i].id)
        }
        modalGameOver.style.zIndex=-1
        modalGameOver.removeEventListener("click", startGame,false)
    }
    function randomSort(oldArray){
        let newArray= []
        while(newArray.length !== oldArray.length){
            let i = Math.floor(Math.random()*oldArray.length)
            if (newArray.indexOf(oldArray[i]) < 0){
                newArray.push(oldArray[i])
            }

        }
        return newArray
    }

    function flipCard(){
        if (flippedCards.length <2){
            let faces = this.getElementsByClassName("face") // criado uma lista de subclasses atreladas à face "face"
            if(faces[0].classList.length >2 ){ // caso a div selecionada possua mais de 2 classes, abortar o "flip". Ou seja, evitar o clique duplo na mesma carta afim de impedir BUGS
                return
            }
            faces[0].classList.toggle("flipped")
            faces[1].classList.toggle("flipped")
            flippedCards.push(this)
            if (flippedCards.length===2){
                if(flippedCards[0].childNodes[3].id ===flippedCards[1].childNodes[3].id){
                    flippedCards[0].childNodes[1].classList.toggle("match")
                    flippedCards[0].childNodes[3].classList.toggle("match")
                    flippedCards[1].childNodes[1].classList.toggle("match")
                    flippedCards[1].childNodes[3].classList.toggle("match")

                    matchCardSign()

                    matches++

                    flippedCards=[]

                    if(matches===6){
                        gameOver()
                        
                    }
                }
            }
        } else{
            console.log(flippedCards)// observar no console > childNodes > nodeList (5) precisamos remover a classe "Flipped" dos índices do array
            flippedCards[0].childNodes[1].classList.toggle("flipped")// back flipped
            flippedCards[0].childNodes[3].classList.toggle("flipped")// front flipped
            flippedCards[1].childNodes[1].classList.toggle("flipped")// back flipped
            flippedCards[1].childNodes[3].classList.toggle("flipped")// front flipped

            flippedCards= []
        }
       
        
    }

  

    function gameOver(){
        console.log(matches)
        // modalGameOver.style= "z-index: 1;" 
        modalGameOver.style.zIndex=15
        modalGameOver.addEventListener("click", startGame,false)
    }
    function matchCardSign(){
        imgMatchsign.style.zIndex = 1
        imgMatchsign.style.top = 70 + "vh" 
        imgMatchsign.style.opacity = 0
        setTimeout(function(){
        imgMatchsign.style.zIndex = -1
        imgMatchsign.style.top = 30 + "vh" 
        imgMatchsign.style.opacity = 1
        },1500 )
    }

} ())