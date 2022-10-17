window.addEventListener('load', function() {
    if(localStorage.getItem("show-update-info") == null) {
        document.getElementById("update-info").classList.add("open");
    }
})

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    
    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        e.preventDefault();
    } else if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal-button') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        localStorage.setItem("show-update-info", 0);
        e.preventDefault();
    }
}, false);