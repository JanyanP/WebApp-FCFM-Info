import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonRange } from '@ionic/angular';
import { ModalComputacionalesComponent } from '../modal-computacionales/modal-computacionales.component';
import {Howl} from 'howler';


/////////////////////////////////////////
export interface Track{//////////////////
  name: string;//////////////////////////
  path: string;//////////////////////////
}
////////////////////////////////////////
@Component({
  selector: 'app-lcc',
  templateUrl: './lcc.component.html',
  styleUrls: ['./lcc.component.scss'],
})
export class LccComponent implements OnInit {
/////////////////////////////////////////////////////////
  
playlist: Track[]=[
    {
      name: 'Licenciatura en Ciencias Computacionales',
      path: 'assets/lcc.mp3'
    }
  ];

  activeTrack: Track=null;
  player: Howl=null;
  isPlaying=false;
  progress=0;
  @ViewChild('range',{static:false})range:IonRange;
  start(track:Track){
    if(this.player){
      this.player.stop();
    }
    this.player=new Howl({
      src:[track.path],
      html5:true,
      onplay: ()=>{
        console.log('onPlay');
        this.isPlaying=true;
        this.activeTrack=track;
        this.updateProgress();
      },
      onend: ()=>{
        console.log('onEnd');
      }
    });
    this.player.play();
  }
  tooglePlayer(pause){
    this.isPlaying=!pause;
    if(pause){
      this.player.pause();
    }else{
      this.player.play();
    }

  }
  seek(){
    let newValue=+this.range.value;
    let duration=this.player.duration();
    this.player.seek(duration*(newValue/100));
  }
  updateProgress(){
    let seek=this.player.seek();
    this.progress=(seek/this.player.duration())*100||0;
    setTimeout(()=>{
      this.updateProgress();
    },1000)
  }

/////////////////////////////////////////////////////////
  dataReturned:any;
  constructor(
    public modalController: ModalController
  ) { }
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalComputacionalesComponent,
      componentProps: {
        "paramTitle": "Campo de trabajo",
        "paramempleo1":" Departamento de Sistemas",
        "paramempleo2":" Desarrollo de Software ",
        "paramempleo3":"Tecnologías de la Información ",
        "paramempleo4":"Soporte Tecnológico de instituciones públicas y privadas ",
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }

  ngOnInit() {}

}
