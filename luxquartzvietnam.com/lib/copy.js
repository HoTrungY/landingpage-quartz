function pvaCopyText() {
    const textarea = document.getElementById("pvaCopyTextarea");
    const button = document.getElementById("pvaCopyButton");
    if(textarea){
        textarea.select();
        document.execCommand("copy");
        button.textContent = "Copied!";
    } else {
        button.textContent = "No Copy";
    }
    setTimeout(() => { button.textContent = "Copy Link"; }, 3000);
}