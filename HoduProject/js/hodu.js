const loadImagesButton = document.getElementById("learn_more_btn");
const frame = document.getElementById('frame');
const imageList = document.querySelector(".infinite");
let pageToFetch = 1;
let totalImagesFetched = 0;
const maxImages = 50;

async function fetchImages(pageNum){
    try {
        if (totalImagesFetched >= maxImages) {
            frame.style.display = 'none';
            return;
        }

        const response = await fetch('https://picsum.photos/v2/list?page='+pageNum+'&limit=20');
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const datas = await response.json();
        console.log(datas);

        makeImageList(datas);

    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}

function makeImageList(datas){
    datas.forEach((item)=>{
        if (totalImagesFetched < maxImages) {
            imageList.innerHTML = imageList.innerHTML + "<img src="+ item.download_url +" alt=''>";
            totalImagesFetched++;
        }
    });
}

loadImagesButton.addEventListener('click', () => {
    frame.style.display = 'none';
    fetchImages(pageToFetch++);

    // Activate infinite scroll after the button is clicked
    window.addEventListener('scroll', infiniteScroll);
});

function infiniteScroll() {
    // 스크롤이 상단으로부터 얼마나 이동했는지 알아야합니다. (뷰포트의 높이 + 스크롤된 길이)
    // 화면에 로딩된 페이지의 전체 높이
    // 뷰포트의 높이 + 스크롤된 길이 + 10 === 화면에 로딩된 페이지의 전체 높이

    if(window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight){
        fetchImages(pageToFetch++);
    }
}


function openModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}