let globalData = [];
Contents = document.getElementById("Contentsrow")
const addCard = () => {
    const newDetails = {
        id: `${Date.now()}`, //primary key       
        title: document.getElementById("Title").value,
        type: document.getElementById("Type").value,
        description: document.getElementById("Description").value
    };

    Contents.insertAdjacentHTML('beforeend', generateCard(newDetails));  //BEFOREEND inserts the content inside element as the last child

    globalData.push(newDetails);
    saveToLocalStorage();
}

const generateCard = ({ id, title, type, description }) => {
    return (
        `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}> 
            <div class="card">
                <div class="card-header">
                    <div class="card-header d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-info" name=${id} onclick="editFeedback(this)">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteFeedback(this)">
                            <i class="far fa-trash-alt"></i>
                        </button>   
                    </div>                      
                </div>
                <div class="card-body">
                    <h5 class="card-title text-uppercase">${title}</h5>
                    <p class="card-text">${description}</p>
                    <span class="badge bg-primary">${type}</span>
                </div>
            </div>
        </div>`
    )
}

console.log(Contents)

const saveToLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({ tasks: globalData })) //JSON converts string to object
}

const reloadFeedback = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky")); //now const will store an object
    console.log(localStorageCopy)
    if (localStorageCopy) {
        globalData = localStorageCopy["tasks"];
    }
    globalData.map((cardData) => {
        Contents.insertAdjacentHTML("beforeend", generateCard(cardData));
    })
}

const deleteFeedback = (e) => {
    console.log(e)
    const targetID = e.getAttribute("name");
    console.log(targetID);
    globalData = globalData.filter((cardData) => cardData.id !== targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editFeedback = (e) => {
    console.log(e);
    // console.log(e.tagName);
    // const elementType = e.tagName;

    let parentElement;
    let title;
    let type;
    let description;

    e.childNodes[1].classList.remove("fa-pencil-alt");
    e.childNodes[1].classList.add("fa-check");
    // e.childNodes[1].classList.style.setProperty("btn-success");

    parentElement = e.parentNode.parentNode.parentNode;
    console.log(parentElement.childNodes[3])
    title = parentElement.childNodes[3].childNodes[1];
    type = parentElement.childNodes[3].childNodes[3];
    description = parentElement.childNodes[3].childNodes[5];
    click = parentElement.childNodes[5];

    // console.log(title);
    // console.log(type);
    // console.log(description);

    title.setAttribute("contenteditable", "true");
    type.setAttribute("contenteditable", "true");
    description.setAttribute("contenteditable", "true");

    console.log(e)
    e.setAttribute("onclick", "saveFeedback(this)");
};

const saveFeedback = (e) => {
    console.log(e);
    const targetID = e.getAttribute("name");
    console.log(targetID);
    const elementType = e.tagName;
    console.log(elementType);
    let parentElement;

    parentElement = e.parentNode.parentNode.parentNode;

    const FeedbackTitle = parentElement.childNodes[3].childNodes[1];
    const FeedbackType = parentElement.childNodes[3].childNodes[3];
    const FeedbackDescription = parentElement.childNodes[3].childNodes[5];

    const updatedFeedback = {
        title: FeedbackTitle.innerHTML,
        type: FeedbackType.innerHTML,
        description: FeedbackDescription.innerHTML,
    };

    console.log({ updatedFeedback, targetID });

    globalData = globalData.map((cardData) => {
        if (cardData.id === targetID) {
            // console.log({ ...cardData, ...updatedFeedback });
            return { ...cardData, ...updatedFeedback };
        }
        return cardData;
    });

    saveToLocalStorage();

    FeedbackTitle.setAttribute("contenteditable", "false");
    FeedbackType.setAttribute("contenteditable", "false");
    FeedbackDescription.setAttribute("contenteditable", "false");

    //   console.log(e.childNodes[1].classList);
    e.childNodes[1].classList.remove("fa-check");
    e.childNodes[1].classList.add("fa-pencil-alt");
    e.setAttribute("onclick", "editFeedback(this)");

    //   // window.location.reload();
};
