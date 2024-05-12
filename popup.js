let copyBtn = document.querySelector("#copyBtn");
let favIcon = document.querySelector("#favIcon");
let tabTitle = document.querySelector("#tabTitle");

copyBtn.addEventListener("click", async ()=>{
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        function : pickTitle,
    }, async (injectionResults) => {
        const [Data] = injectionResults;
        if(Data.result){
            const Title = Data.result[0];
            tabTitle.innerText = `${Title} Copied to CLIPBOARD`;
            await navigator.clipboard.writeText(Title);

            const icon = Data.result[1];
            favIcon.style.background = `url(${icon})`;
            favIcon.style.backgroundRepeat = "no-repeat";
            favIcon.style.backgroundPosition = "center";
            favIcon.style.backgroundSize = "cover";
            favIcon.addEventListener("click", ()=>{
                navigator.clipboard.writeText(icon)
                tabTitle.innerText = `FaviconURL is Copied to CLIPBOARD`;
            })
        }
    });
});

function pickTitle(){
    let title = document.title;
    let favIconURL = document.querySelector("link[rel*='icon']").href;

    return [title, favIconURL]
}