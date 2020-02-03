import AI from './AI.js';

(function(){
    let aiList = document.getElementById('AIList');
    let create = document.getElementById('create');
    let searchButton = document.getElementById('test');
    let buttonVisible = false;

    document.onload = function(){
        if(localStorage.getItem('AIs') != null){
            let as = JSON.parse(localStorage.getItem('AIs'))

            as.forEach(element => {
                render(element);
            });
        }
    }();


    document.addEventListener('keydown', (e)=>{
        if(e.keyCode == 70){
            //console.log("nappi")
            hideCreateButton();
        }
    });

    create.addEventListener('click', (e)=>{
        e.preventDefault();
        createNew();
    })

    function hideCreateButton(){
        buttonVisible ? (create.style.display = 'none') && (buttonVisible = false) : (create.style.display = 'inline') && (buttonVisible = true);
    }


    function createNew(){
        let ai = AI('Self-Aware AI', 
        "While it is easy to debate on whether as humans we have attained self-awareness, this type of artificial intelligence is still a probability and has the potential for real-world application. In this type of artificial intelligence, machines or robots are aware of who they are, understand their internal traits, states and conditions and even perceive human emotions. Self-aware artificial intelligence is an extension of the Theory of Mind class of artificial intelligence. Hypothetically, if you are in a movie theatre and you cut the line a self-aware robot is standing, you could make him or her angry and react.Though the days self-aware robots and intelligent systems would hit the market and earth are still far away, disruptive technological advancements may bring them anytime sooner. You never know. Ten years back, who would have thought you could have the entire world covered in your palm? Now, don’t we all have a piece of everyone’s life in us? Self-aware much?", 
        './img/self.jpg');

        let existingEntries = JSON.parse(localStorage.getItem('AIs'));

        if(existingEntries == null)
            existingEntries = [];

        existingEntries.push(ai);
        localStorage.setItem('AIs', JSON.stringify(existingEntries));
            
        render(ai);
    }

    function search(){
        let searchInput = document.getElementById('searchInput');
        let ais = JSON.parse(localStorage.getItem('AIs'));

        ais.filter((item)=>{
            item.type.toLowerCase().includes(searchInput.value.toLowerCase()) ? 
            aiList.children[ais.indexOf(item)].style.display = 'flex' : aiList.children[ais.indexOf(item)].style.display = 'none';
        })
        searchInput.value = '';
    }

    searchButton.addEventListener('click',search);


    function render(ai){
        let aiItem = document.createElement('li');
        let aiName = document.createElement('h4');
        let aiPic = document.createElement('img');

        aiName.textContent = ai.type;
        aiPic.src = ai.picture;

        aiItem.appendChild(aiName);
        aiItem.appendChild(aiPic);
        aiList.appendChild(aiItem);
    }
})();