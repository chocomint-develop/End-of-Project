const DAYS=['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
const MONTHS=['tháng 1','tháng 2','tháng 3','tháng 4','tháng 5','tháng 6','tháng 7','tháng 8','tháng 9','tháng 10','tháng 11','tháng 12'];

function tick(){
    const n=new Date();
    const h=String(n.getHours()).padStart(2,'0');
    const m=String(n.getMinutes()).padStart(2,'0');
    const s=String(n.getSeconds()).padStart(2,'0');
    const dateStr=`${DAYS[n.getDay()]}, ${n.getDate()} ${MONTHS[n.getMonth()]} ${n.getFullYear()}`;
    document.getElementById('tb-clock').textContent=`${h}:${m}:${s}`;
    document.getElementById('tb-date').textContent=dateStr;
    document.getElementById('ct-time').textContent=`${h}:${m}`;
    document.getElementById('ct-date').textContent=`${DAYS[n.getDay()].slice(0,7)} · ${n.getDate()}/${n.getMonth()+1}`;
}
tick();setInterval(tick,1000);

// ripple
document.querySelectorAll('.tile').forEach(t=>{
    t.addEventListener('click',function(e){
        const r=document.createElement('span');
        r.className='ripple';
        const sz=Math.max(this.offsetWidth,this.offsetHeight);
        r.style.cssText=`width:${sz}px;height:${sz}px;left:${e.offsetX-sz/2}px;top:${e.offsetY-sz/2}px`;
        this.appendChild(r);
        setTimeout(()=>r.remove(),350);
    });
});