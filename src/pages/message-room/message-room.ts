import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ViewController } from 'ionic-angular';
import * as firebase from 'Firebase';
/**
 * Generated class for the MessageRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-room',
  templateUrl: 'message-room.html',
})
export class MessageRoomPage {
  
  @ViewChild(Content) content: Content;
	data = { type:'', nickname:'', message:'' };
	chats = [];
	roomkey:string;
	nickname:string;
	offStatus:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view:ViewController) {

    this.roomkey = this.navParams.get('key')
    console.log(this.roomkey)
    this.nickname = "Seller"
    this.data.type = 'message';
	  this.data.nickname = this.nickname;

	  	let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
		  joinData.set({
		    type:'join',
		    user:this.nickname,
		    message:this.nickname+' has joined this room.',
		    sendDate:Date()
		  });
		  this.data.message = '';

		  firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
		    this.chats = [];
		    this.chats = snapshotToArray(resp);
		    setTimeout(() => {
		      if(this.offStatus === false) {
		        this.content.scrollToBottom(300);
		      }
		    }, 1000);
		  });
  }

  sendMessage() {
	  let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
	  newData.set({
	    type:this.data.type,
	    user:this.data.nickname,
	    message:this.data.message,
	    sendDate:Date()
	  });
	  this.data.message = '';
  }
  
  exitChat() {
	  let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
	  exitData.set({
	    type:'exit',
	    user:this.nickname,
	    message:this.nickname+' has exited this room.',
	    sendDate:Date()
	  });

	  this.offStatus = true;
    this.view.dismiss()
	  // this.navCtrl.setRoot(CurrentOrderDetailPage, {
	  //   nickname:this.nickname
	  // });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageRoomPage');
  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
