Page({
	data:{
		info:"日历组件"
	},
	test:function(){
		wx.showToast({
			title:this.data.info
		})
	},
	onLoad: function (options) {
		console.log('options'+"页面初始化");
	},
	onReady:function (){
		console.log('页面渲染完成');
		var that=this;
		console.log(that)
		class Calendar{
			constructor(options){
				let defaults={
					initData:new Date(),
					callback:function(){

					}
				}
				options=Object.assign({},defaults,options)
				
				//更新年和月
				let year=options.initData.getFullYear();
				let month=options.initData.getMonth()+1;
				
				this.year=year;
				this.month=month;
				this.callback=options.callback;

				//this.renderPrevMonth(year,month)

				this.renderCurrentMonth(year,month)
				//this.renderAllMonth(year,month);

				//this.upCalendar(year,month);
				//this.bindEvent()
			}
			//更新日历表头
			upCalendar(year,month){
				this.pluginCalendar.querySelector(".current_month").innerHTML=year+"年"+month+"月"
			}
			//获取每个月的天数
			getMonthDays(year,month){
				let d31=[1,3,5,7,8,10,12];
				let d30=[4,6,9,11];
				let days=31;//初值
				year=year*1;//将字符串变为number
				month=month*1;
				if(month==2){
					if(year%4==0 && year%100!=0 || year%400==0){
						days=29;
					}else{
						days=28;
					}
				}else{
					if(d31.indexOf(month)>-1){
						days=31
					}else if(d30.indexOf(month)>-1){
						days=30;
					}
				}
				return days;
			}
			//获取每个月的第一天是星期几
			firstDayInMonth(year,month){
				let first=new Date(year+"/"+month+"/"+1);//month不用+1吗
				return first.getDay()
			}

			//渲染上个月的天数
			renderPrevMonth(year,month){
				let prevMonth=new Date(year+"/"+(month-1));
				this.prevMonthDays=this.getMonthDays(prevMonth.getFullYear(),prevMonth.getMonth()+1);//?
				let leftDays=this.firstDayInMonth(year,month)//返回这个月1号对应的星期值[0,6]
				let str="";
				for(let i=this.prevMonthDays-leftDays+1;i<=this.prevMonthDays;i++){
					str+=`<span class="togrey">${i}</span>`
				}
				return str;
				that.setData({"prevDays":prevMonthDays})
			}
			//渲染本月的天数
			renderCurrentMonth(year,month){
				let str="",start=1;
				this.currentMonthDays=this.getMonthDays(year,month);
				for(let i=1;i<=this.currentMonthDays;i++){
					str+=`<span class="cal_day">${i}</span>`
				}
				return str;
			}
			////渲染下个月的天数
			renderNextMonth(year,month){
				let str=""
				let nextLeftDays=42-this.prevMonthDays-this.currentMonthDays;
				for(let i=1;i<=nextLeftDays;i++){
					str+=`<span class="togrey">${i}</span>`
				}
				return str;
			}
			//渲染全部的日历部分
			render(year,month){
				
			}
			//绑定事件：????
			bindEvent(){
				if(target.classList.contains("prevMonth")){
					let date=new Date(this.year,(this.month-1-1))
					let prevMonth=date.getMonth()+1;
					let prevYear=date.getFullYear();
					this.render(prevYear,prevMonth);
					this.year=prevYear;
					this.month=prevMonth;
					this.upCalendar(prevYear,prevMonth);
				}
				if(target.classList.contains("nextMonth")){
					let date=new Date(this.year,(this.month-1+1))
					let nextMonth=date.getMonth()+1;
					let nextYear=date.getFullYear();
					this.render(nextYear,nextMonth);
					this.year=nextYear;
					this.month=nextMonth;
					this.upCalendar(nextYear,nextMonth);
				}
			}
		}
	}
})

