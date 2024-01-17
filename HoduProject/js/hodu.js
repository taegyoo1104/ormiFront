const frame = document.getElementById('frame');
const imageList = document.querySelector("#infinite");
let pageToFetch = 1;
let totalImagesLoaded = 0;
const totalImagesToLoad = 30; // 총 로드할 이미지 수

// 버튼 클릭 이벤트에 대한 리스너 추가
document.getElementById('loadMore').addEventListener('click', function() {
    if (totalImagesLoaded < totalImagesToLoad) {
        fetchImages(pageToFetch++);
        window.addEventListener('scroll', handleScroll);
    } else {
        console.log('이미지를 모두 로드했습니다.');
        frame.style.display = 'none';
        window.removeEventListener('scroll', handleScroll);
    }
});

async function fetchImages(pageNum) {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=' + pageNum + '&limit=10');
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const datas = await response.json();
        frame.style.display = 'none';


        if (datas.length === 0 || totalImagesLoaded >= totalImagesToLoad) {
            loadMoreButton.style.display = 'none';
            frame.style.display = 'none';
            window.removeEventListener('scroll', handleScroll); // 무한 스크롤 중지
            return;
        }

        totalImagesLoaded += datas.length;
        makeImageList(datas);
    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}

function makeImageList(datas) {
    // 이미지를 3장씩 포함하는 div를 생성
    for (let i = 0; i < datas.length; i += 3) {
        const imageDiv = document.createElement('div');

        // 각 이미지마다 새로운 img 요소를 생성하고 div에 추가
        for (let j = i; j < i + 3 && j < datas.length; j++) {
            const imgElement = document.createElement('img');
            imgElement.src = datas[j].download_url;
            imgElement.alt = '';
            imgElement.style.width = '378px';
            imgElement.style.height = '378px';
            imageDiv.appendChild(imgElement);

            // 이미지 간격을 위한 스타일 설정
            if (j < i + 2 && j < datas.length - 1) {
                const gapElement = document.createElement('div');
                gapElement.style.width = '72px';
                imageDiv.appendChild(gapElement);
            }
        }
        // 이미지를 포함한 div를 imageList에 추가
        imageList.appendChild(imageDiv);
    }
}
function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight) {
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