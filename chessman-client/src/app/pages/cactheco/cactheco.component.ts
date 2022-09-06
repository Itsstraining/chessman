import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cactheco',
  templateUrl: './cactheco.component.html',
  styleUrls: ['./cactheco.component.scss']
})
export class CacthecoComponent implements OnInit {
  arr =[
    {
      name: "Khổng Minh Tá Tiễn",
      img:"KMTT.png",
      grapStr:'     VT  |p  xc X  |   STS   |         |        x|        c|          |   m     |m   C C  |     v   '
    },
      {
        name: "Tam anh chiến Lữ Bố",
        img:"TACLB.png",
        grapStr:'   V X  P|    c    |         |         |         |         |   C  ppx|    C   t|     C   |    v t  '
      },
      {
        name: "thế triệu đô mozambic",
        img:"TDMOZAM.png",
        grapStr:'p  V     |    SM   |   cT    |   c    x|        c|         |         |t        | CC  C   |   vPMC  '
      },
      {
        name: "Thế cờ Song mã bảo giá",
        img:"SMBG.png",
        grapStr:'c   V    |   cS c  |    T    |       c |         |  X      |  c      | m  tm   | C  C    |   v C   '
      },
      {
        name: "Thế cờ Khưu dẫn hàng long",
        img:"KDHL.png",
        grapStr:'   SV    |    S    |    T    |         |  C      |     x  c|         |         |    C C  |     v  x'
      },
      {
        name: "Thế cờ Đào Hồng Liễu Lục",
        img:"DHLL.png",
        grapStr:'   V  T  |    c    | P       |         |         |        x|        x|     C   |   XC    |     vp p'
      },
      {
        name: "Giải giáp qui điền",
        img:"GGQD.png",
        grapStr:' P  V    |    S    |    TS   |      p  |         |         |    c    |   C     |    X    | x v x   '
      },
      {
        name: "Kinh đào hiểm lạng",
        img:"KDHLANG.png",
        grapStr:'x T V T  |    S    |     S   |         |         |         |         |    C    |   X  p  |    vx   '
      },
  ];
constructor() { }

ngOnInit(): void {

}

}
