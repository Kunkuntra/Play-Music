/**
 * 1. Render songs
 * 2. Scroll top
 *            Sử dụng HTML Audio/Video DOM Reference trên w3schools
 *          HTML Audio/Video Methods dùng để xử lý các hành động
 *          HTML Audio/Video Properties 
 *          HTML Audio/Video Events  nhớ thêm on vào trc 
 * 3. Play / pause / seek              
 * 4. CD rotate            //Sử dụng 'Animate' API  là kiểu animation
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view   //học scroll into view javascript
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playList = $('.playlist')
const cd = $('.cd')
const heading = $('header h1')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const btnPlay = $('.btn-toggle-play')
const changeBtn = $('.btn-play-pause')
const btnRepeat = $('.btn-repeat')
const progress = $('#progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')

// tạo ra biến app để chạy cả chương trình
const app = {
    // tạo ra biến chỉ mục currentIndex để đánh dấu bài hát đầu và lấy ra đc nó
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    //tạo ra property là songs để lưu mảng songs vào
    songs : [
        {
            name: 'Lạ Lùng',
            singer: 'Vũ',
            path:'./assets/music/LaLung.mp3',
            image:'./assets/img/Vũ_circle.png'
        },
        {
            name: 'Sau tất cả',
            singer: 'Erik',
            path:'./assets/music/SauTatCa.mp3',
            image:'./assets/img/Erik_circle.png'
        },
        {
            name: 'Chiều hôm ấy',
            singer: 'Jaykii',
            path:'./assets/music/ChieuHomAy.mp3',
            image:'./assets/img/jaykii_circle.png'
        },
        {
            name: 'Day dứt nỗi đau',
            singer: 'Mr Siro',
            path:'./assets/music/DayDutNoiDau.mp3',
            image:'./assets/img/mrsiro_circle.png'
        },
        {
            name: 'Lạ Lùng',
            singer: 'Vũ',
            path:'./assets/music/LaLung.mp3',
            image:'./assets/img/Vũ_circle.png'
        },
        {
            name: 'Sau tất cả',
            singer: 'Erik',
            path:'./assets/music/SauTatCa.mp3',
            image:'./assets/img/Erik_circle.png'
        },
        {
            name: 'Chiều hôm ấy',
            singer: 'Jaykii',
            path:'./assets/music/ChieuHomAy.mp3',
            image:'./assets/img/jaykii_circle.png'
        },
        {
            name: 'Day dứt nỗi đau',
            singer: 'Mr Siro',
            path:'./assets/music/DayDutNoiDau.mp3',
            image:'./assets/img/mrsiro_circle.png'
        },
        {
            name: 'Lạ Lùng',
            singer: 'Vũ',
            path:'./assets/music/LaLung.mp3',
            image:'./assets/img/Vũ_circle.png'
        },
        {
            name: 'Sau tất cả',
            singer: 'Erik',
            path:'./assets/music/SauTatCa.mp3',
            image:'./assets/img/Erik_circle.png'
        },
        {
            name: 'Chiều hôm ấy',
            singer: 'Jaykii',
            path:'./assets/music/ChieuHomAy.mp3',
            image:'./assets/img/jaykii_circle.png'
        },
        {
            name: 'Day dứt nỗi đau',
            singer: 'Mr Siro',
            path:'./assets/music/DayDutNoiDau.mp3',
            image:'./assets/img/mrsiro_circle.png'
        }
    ],
    //tạo hàm render để render ra các bài hát
    render: function(){
        const htmls = this.songs.map((song,index)=>{
            let a =``;
            if(index === app.currentIndex){
                a = ` active-song`
            }

            return`
            <div class="song${a}" data-index ="${index}">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('')
    },

    defineProperties: function(){

        //để hiểu đọc thêm về bài object và xem các cú pháp của defineProperty 
        Object.defineProperty(this,'currentSong',{ // có thêm một thuộc tính currentSong
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    //Tạo ra hàm handleEvent để xử lý các event của chương trình
    handleEvents: function(){
        const _this = this;

        /*Làm sự kiện Cd quay */ //Đọc thêm phần animate api 
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,   // xét thời gian quay là 10s
            iterations: Infinity // xét số lần lặp lại là vô hạn
        })
        cdThumbAnimate.pause()


        /* Xử lý Scroll Top phóng tho thu nhỏ cd theo tỷ lệ*/
        const cdWidth = cd.offsetWidth
        //lắng nghe sự kiện onscroll (học trong bài DOM) sự kiện cuộn trang cửa sổ windown  
        document.onscroll = function(){
            const scrollTop = document.documentElement.scrollTop;
            const cdWidthNew = cdWidth - scrollTop;
            // console.log(scrollTop)
            // console.log(cdWidthNew)
            const cdHeightNew = cdWidthNew
            if (cdHeightNew>0){
                cd.style.width = cdWidthNew + 'px'
                cd.style.height = cdHeightNew + 'px'
            }
            else{
                cd.style.width = 0 + 'px'
                cd.style.height = 0 + 'px'
            }
        }
         /*Xử lý khi ấn play// pause */
        btnPlay.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
                
            }
            else{
                audio.play()
                
            }
        }
         //khi lắng nghe được nó play
         audio.onplay = function(){
            _this.isPlaying = true
            changeBtn.classList.remove('fa-play')
            changeBtn.classList.add('fa-pause')
            cdThumbAnimate.play()
        }
        //khi lắng nghe được nó pause
        audio.onpause = function(){
            _this.isPlaying = false
            changeBtn.classList.add('fa-play')
            changeBtn.classList.remove('fa-pause')
            cdThumbAnimate.pause()
        }

        //khi ấn vào nút tiến
        btnNext.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }else{
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        btnPrev.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }else{
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();

        }

         //khi tiến độ bài hát thay đổi
         audio.ontimeupdate = function(){ //ontimeupdate sẽ được gọi nếu tiến độ audio thay đổi
            if(audio.duration) {
                const progressGo = Math.floor(audio.currentTime/audio.duration*100); // currentTime là lấy ra giá trị thời gian tính bằng giây // math.floor để làm tròn dưới
                progress.value = progressGo
            }
        }

        // xử lý khi tua bằng thanh progress 
        progress.onchange = function(e){
            const forward = e.target.value
            audio.currentTime = forward*audio.duration/100
        }
        //khi bật tắt random
        btnRandom.onclick = function(){
            _this.ranDom();
        }
        //khi ấn vào nút repeat
        btnRepeat.onclick = function(){
            if (_this.isRepeat){
                btnRepeat.classList.remove("active")
                _this.isRepeat = false
            }else{
                btnRepeat.classList.add("active")
                _this.isRepeat = true
            }
        }

        //khi kết thúc song
        audio.onended = function(){
            if (_this.isRepeat){
                _this.loadCurrentSong()
                audio.play()
            }
            else {
                if(_this.isRandom) {
                    let randomValue
                    do{
                        randomValue = Math.floor(Math.random()*4)
                    }while(randomValue == _this.currentIndex)
                    _this.currentIndex = randomValue
                }
                else{
                    _this.currentIndex ++;
                }
                _this.loadCurrentSong()
                audio.play()
                _this.render();
                _this.scrollToActiveSong();
            }
        }

        //Lắng nghe khi ấn vào bài hát trong playlist
        playList.onclick = function(e){
            const songNote = e.target.closest('.song:not(.active-song)');   // e là element trong playlist, target để lấy phần tử được chọn, closets là tìm kiếm nó và thẻ cha của nó nếu ko thấy sẽ trả về null  // dịch: tạo biến có giá trị là elements được target và ktra xem nó hay thẻ cha của nó có class song và ko có class active-song hay ko 
            const options = e.target.closest('option')
            if(songNote || !options){
                //Xử lý khi click vào song
                if(songNote){   
                    _this.currentIndex = Number(songNote.getAttribute('data-index'));
                    // console.log(_this.currentIndex)
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();

                }
            }
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex>=this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex<0){
            this.currentIndex = this.songs.length-1
        }
        this.loadCurrentSong()
    },

    randomSong: function(){
        let randomValue
        do{
            randomValue = Math.floor(Math.random()*4)
        }while(randomValue == this.currentIndex)
        this.currentIndex = randomValue
        this.loadCurrentSong()
    },

    ranDom: function(){
        if(this.isRandom){
            btnRandom.classList.remove("active")
            this.isRandom = false
        }
        else{
            btnRandom.classList.add("active")
            this.isRandom = true
        }
    },
    // Tạo hàm chuyển động theo bài hát đc active   học kỹ đoạn này
    scrollToActiveSong: function(){
        setTimeout(()=>{
            $('.active-song').scrollIntoView({
                behavior: 'smooth', 
                block:'center',
            })
        },300)
    },

    //hàn chạy để nhét các hmf khác vào cho app chạy
    start: function(){
        //định nghĩa các thuộc tính
        this.defineProperties();

        //Xử lý các sự kiện
        this.handleEvents();

        //Load lên bài hát được chọn(lần đầu vào trang thì load bài đầu tiên)
        this.loadCurrentSong();

        // lấy ra danh sách bài hát
        this.render();
    }
}
app.start();