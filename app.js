function coronaloss(T,Pr,Mo,Ds,V,f,Vrf)
{
var d=(3.86*Pr)/(273+T);
var Vd=((3*(10)**6)/Math.sqrt(2))*Ds*d*Mo*Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds);
var ratio=V/Vd;
var F,Pc;
if(ratio<=0.6)
{
    F=0.012;
    Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;

}
else if(ratio>0.6 && ratio<=0.8)
{
    F=0.018;
    Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;

}
else if(ratio>0.8 && ratio<=1)
{
    F=0.05;
Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;
}
else if(ratio>1 && ratio<=1.2)
{
    F=0.08;
    Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;
}
else if(ratio>1.2 && ratio<=1.4)
{
    F=0.3;
    Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;
}
else if(ratio>1.4 && ratio<=1.6)
{
    F=1.0;
    Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;
}
else if(ratio>1.6 && ratio<=1.8){
    F=3.5;
    Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;
}
else if(ratio>1.8 && ratio<=2.0){
    F=6.0;
    Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;
}
else if(ratio>2.0 && ratio>=2.2)
{
    F=8.0;
    Pc=((21*(10)**-6)*f*(Vrf**2)*F)/(Math.log((((8.6**3)*97.97*170*97.97)**1/3)/Ds))**2;

}
else{
    alert("baf");
}
return Pc;

}
function calcSag(I,W,T,Pr)
{
    var wtotal=Math.sqrt((W/1000)**2+((Pr/10000)*1333.22)**2);
    var sag=(((I**2)*wtotal)/(8*T*1000));
    return sag;
}
function analysisParameters()
{
     var L=document.getElementById("length").value;
    var P=document.getElementById("power").value;
    var pFr=document.getElementById("powerFactor").value;
    // var R=document.getElementById("resis").value;
    var T=document.getElementById("temp").value;
    var Pr=document.getElementById("per").value;
    var Mo=document.getElementById("ifactor").value;
    var f=document.getElementById("freq").value;
    var Tsion=document.getElementById("tsion").value;
    if (Tsion>=1 && Tsion<=5 && L>=250 && P>=50 && pFr>=0.85 && pFr<=0.95  && T>20 && T<=55 && Pr>10 && Pr<=100 && Mo>=0.8 && Mo<=1 && f>=49.5 && f<=50.5)
    {
           var V=220;
           var span=150;
           var GC=5.18+((V-33)/33)*0.3048;
    var rprime,Ln,Cn,R,W;

    if(document.getElementById('r1').checked){
        R=0.7191;
        W=1628;
         rprime=0.7788*(0.0281432/2);
         console.log(document.getElementById('r1').value) ;
    }
       

    else if(document.getElementById('r2').checked)
    {
        R=0.2143;
        W=2433;
         rprime=0.7788*(0.0163068/2);
         console.log(document.getElementById('r2').value) ;
    }
       
    else {
        W=546;
        R=0.04516;
        rprime=(0.0351028/2);
        console.log(document.getElementById('r3').value) ;

    }
     console.log(rprime)
    Ln=(0.4605*2)*Math.log((((8.6**3)*97.97*170*97.97)**1/3)/((rprime**3)*576.4801*96.04));
    console.log(((Ln)),"mH/Km") ;
    document.getElementById("L").innerText=Ln.toFixed(3)+"mH/Km";
    // console.log(Ln*L,"mH for ",L,"Km")
    // capacitance calculation...

      Cn=0.02414/(Math.log(8.184/(Math.sqrt(8.6*(rprime/0.7788)))));
      console.log(Cn*1000,"nF/Km")
      document.getElementById("C").innerText=(Cn*1000).toFixed(3)+"nF/Km";
    // reactances
    var Xl=2*3.142*f*Ln;
    document.getElementById("Xl").innerText=(Xl/10000).toFixed(3)+"ohm/Km"
    console.log(Xl/10000," Xl")
    var Xc=1/(2*3.142*f*Cn);
    document.getElementById("Xc").innerText=Xc.toFixed(3)+"ohm.Km";
    console.log(Xc," Xc")
    var Sag=calcSag(span,W,Tsion,Pr);
    document.getElementById("sag").innerText=Sag.toFixed(2)+ "m";
    document.getElementById("height").innerText=30+"m";
    document.getElementById("cweight").innerText=W +"Kg/Km";
    
      var Ir=(P*1000)/(Math.sqrt(3)*(V)*pFr);
    var f=document.getElementById("freq").value;
    var Z=eval((R*L)+Math.cos(2*3.142*f*Ln*((10)**-3)*L));
    console.log(Z," Z")
    var Y=Math.cos(2*3.142*f*Cn*L);
    console.log(Y," y")
    var Vs=V*(1+(Y*Z)/2)+(Ir*Z);
    var E=((P*1000)/((P*1000)+((3*(Ir)**2)*(R/1000))))*100;
    // console.log(R/1000,"Kohm resistnce /n",Ir)
    document.getElementById("GC").innerText=GC.toFixed(3);
    console.log(E," effi")
    document.getElementById("e").innerText=E.toFixed(3);
    // Vr at no load...
    var Vr=Vs/(1+(Y*Z)/2);
    // vr at full load;
    var Vrf=(V*10/Math.sqrt(3))
    // voltage regulation....
    var VR=(Vr-Vrf)/Vrf;
    console.log(Math.abs(VR)," voltage regulation...")
    document.getElementById("VR").innerText=Math.abs(VR.toFixed(3));
    // corona loss calculation...
var Ds=((rprime**3)*576.4801*96.04);
 var Pc=coronaloss(T,Pr,Mo,Ds,V,f,Vrf);
 Pc=Pc*10;
 console.log(Pc,"corona loss KW/Phase/Km");
 document.getElementById("Pc").innerText=Pc.toFixed(3)+"KW/phase/Km";
// recommandation section
// efficiency
if(E.toFixed(3)>=90)
{
    document.getElementById("excellent(e)").style.backgroundColor="grey";
    document.getElementById("good(e)").style.backgroundColor="";
    document.getElementById("poor(e)").style.backgroundColor="";
   
}
else if(E.toFixed(3)>=70 && E.toFixed(3)<90)
{
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="grey";
    document.getElementById("poor(e)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(e)").style.backgroundColor="grey";
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="";
    
}
// voltage Regulation-----------------
if(Math.abs(VR.toFixed(3))<5)
{
    document.getElementById("excellent(vr)").style.backgroundColor="grey";
    document.getElementById("good(vr)").style.backgroundColor="";
    document.getElementById("poor(vr)").style.backgroundColor="";
   
}
else if(Math.abs(VR.toFixed(3))>5 && Math.abs(VR.toFixed(3))<=10)
{
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="grey";
    document.getElementById("poor(vr)").style.backgroundColor="";
    
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}
// corona powerloss----------
if(Pc.toFixed(3)<0.3)
{
    document.getElementById("excellent(pc)").style.backgroundColor="grey";
    document.getElementById("good(pc)").style.backgroundColor="";
    document.getElementById("poor(pc)").style.backgroundColor="";
   
   
}
else if(Pc.toFixed(3)>0.3 && Pc.toFixed(3)<=0.6)
{
    document.getElementById("excellent(pc)").style.backgroundColor="";
    document.getElementById("good(pc)").style.backgroundColor="grey";
    document.getElementById("poor(pc)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}






}

else{
    alert("plz ,do enter the correct format...")
}



}

function geo2Analysis()
{
    var L=document.getElementById("length").value;
    var P=document.getElementById("power").value;
    var pFr=document.getElementById("powerFactor").value;
    // var R=document.getElementById("resis").value;
    var T=document.getElementById("temp").value;
    var Pr=document.getElementById("per").value;
    var Mo=document.getElementById("ifactor").value;
    var f=document.getElementById("freq").value;
    var Tsion=document.getElementById("tsion").value;
    if (Tsion>=1 && Tsion<=5 && L>=250 && P>=50 && pFr>=0.85 && pFr<=0.95 && T>20 && T<=55 && Pr>10 && Pr<=100 && Mo>=0.8 && Mo<=1 && f>=49.5 && f<=50.5)
    {
            var V=220;
            var span=150;
            var GC=5.18+((V-33)/33)*0.3048;
            var Gmr,Ln,Cn,d,R,W;

    if(document.getElementById('r1').checked){
        W=1628;
        R=0.7191;
        Gmr=0.0373*0.3048;
        d=(1.108/2)*0.0254;
    }
       

    else if(document.getElementById('r2').checked)
    {
        R=0.2143;
        W=546;
        Gmr=0.0217*0.3048;
        d=(0.642/2)*0.0254;
    }
       
    else {
        W=2433;
        R=0.04516;
        Gmr=0.0444*0.3048;
        d=(1.382/2)*0.0254;

    }
    Ln=(0.4605)*Math.log(((9.14*9.14*18.28)**1/3)/(Gmr*d)**1/2);
    console.log(((Ln)),"mH/Km")   ;
    document.getElementById("L").innerText=Ln.toFixed(3)+"mH/Km";
    Cn=0.02414/(Math.log(((9.14*9.14*18.28)**1/3)/((Gmr*d)**1/2)));
    console.log(Cn*1000,"nF/Km")
    document.getElementById("C").innerText=(Cn*1000).toFixed(3)+"nF/Km";
   
    var Xl=2*3.142*f*Ln;
    document.getElementById("Xl").innerText=(Xl/10000).toFixed(3)+"ohm/Km"
    console.log(Xl/10000," Xl")
    var Xc=1/(2*3.142*f*Cn);
    document.getElementById("Xc").innerText=Xc.toFixed(3)+"ohm.Km";
    console.log(Xc," Xc")
   
    var Sag=calcSag(span,W,Tsion,Pr);
    document.getElementById("sag").innerText=Sag.toFixed(2)+ "m";
    document.getElementById("height").innerText=29.89+"m";
    document.getElementById("cweight").innerText=W +"Kg/Km";
   
    var Ir=(P*1000)/(Math.sqrt(3)*(V)*pFr);
    var Z=eval((R*L)+Math.cos(2*3.142*f*Ln*((10)**-3)*L));
    console.log(Z," Z")
    var Y=Math.cos(2*3.142*f*Cn*L);
    console.log(Y," y")
    var Vs=V*(1+(Y*Z)/2)+(Ir*Z);
    var E=((P*1000)/((P*1000)+((3*(Ir)**2)*(R/1000))))*100;
    // console.log(R/1000,"Kohm resistnce /n",Ir)
    console.log(E," effi")
    document.getElementById("GC").innerText=GC.toFixed(3);
    // console.log(E," effi")
    document.getElementById("e").innerText=E.toFixed(3);
    // Vr at no load...
    var Vr=Vs/(1+(Y*Z)/2);
    // vr at full load;
    var Vrf=(V/Math.sqrt(3))
    // voltage regulation....
    var VR=(Vr-Vrf)/Vrf;
    console.log(Math.abs(VR)," voltage regulation...")
    document.getElementById("VR").innerText=Math.abs(VR.toFixed(3));
    // corona loss calculation...
var Ds=((Gmr*d)**1/2);
 var Pc=coronaloss(T,Pr,Mo,Ds,V,f,Vrf);
 document.getElementById("Pc").innerText=Pc.toFixed(3)+"KW/phase/Km";
 console.log(Pc,"corona loss KW/Phase/Km");


// recommandation section
// efficiency
if(E.toFixed(3)>=90)
{
    document.getElementById("excellent(e)").style.backgroundColor="grey";
    document.getElementById("good(e)").style.backgroundColor="";
    document.getElementById("poor(e)").style.backgroundColor="";
   
}
else if(E.toFixed(3)>=70 && E.toFixed(3)<90)
{
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="grey";
    document.getElementById("poor(e)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(e)").style.backgroundColor="grey";
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="";
    
}
// voltage Regulation-----------------
if(Math.abs(VR.toFixed(3))<5)
{
    document.getElementById("excellent(vr)").style.backgroundColor="grey";
    document.getElementById("good(vr)").style.backgroundColor="";
    document.getElementById("poor(vr)").style.backgroundColor="";
   
}
else if(Math.abs(VR.toFixed(3))>5 && Math.abs(VR.toFixed(3))<=10)
{
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="grey";
    document.getElementById("poor(vr)").style.backgroundColor="";
    
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}
// corona powerloss----------
if(Pc.toFixed(3)<0.3)
{
    document.getElementById("excellent(pc)").style.backgroundColor="grey";
    document.getElementById("good(pc)").style.backgroundColor="";
    document.getElementById("poor(pc)").style.backgroundColor="";
   
   
}
else if(Pc.toFixed(3)>0.3 && Pc.toFixed(3)<=0.6)
{
    document.getElementById("excellent(pc)").style.backgroundColor="";
    document.getElementById("good(pc)").style.backgroundColor="grey";
    document.getElementById("poor(pc)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}





}

else{
    alert("plz ,do enter the correct format...")
}


}

// geo3---------------------------------------------

function geo3Analysis()
{
    var L=document.getElementById("length").value;
    var P=document.getElementById("power").value;
    var pFr=document.getElementById("powerFactor").value;
    var T=document.getElementById("temp").value;
    var Pr=document.getElementById("per").value;
    var Mo=document.getElementById("ifactor").value;
    var f=document.getElementById("freq").value;
    var Tsion=document.getElementById("tsion").value;
    if ( Tsion>=1 && Tsion<=5 &&L>=250 && P>=50 && pFr>=0.85 && pFr<=0.95  && T>20 && T<=55 && Pr>10 && Pr<=100 && Mo>=0.8 && Mo<=1 && f>=49.5 && f<=50.5)
    {
            var V=500;
            var span=500;
            var GC=5.18+((V-33)/33)*0.3048;
            var Gmr,Ln,Cn,R,W;

    if(document.getElementById('r1').checked){
        W=1628;
        R=0.7191;
        Gmr=0.0373*0.3048;
        
    }
       

    else if(document.getElementById('r2').checked)
    {
        W=546;
        R=0.2143;
        Gmr=0.0217*0.3048;
        
    }
       
    else  {
        W=2433;
        R=0.04516;
        Gmr=0.0444*0.3048;
        

    }
    
    Ln=(0.4605)*Math.log(((13.2*13.2*26.4)**1/3)/Gmr);
    console.log(((Ln)),"mH/Km")   ;
    document.getElementById("L").innerText=Ln.toFixed(3)+"mH/Km";
    Cn=0.02414/(Math.log(((13.2*13.2*26.4)**1/3)/Gmr));
    console.log(Cn*1000,"nF/Km")
    document.getElementById("C").innerText=(Cn*1000).toFixed(3)+"nF/Km";
   
    var Xl=2*3.142*f*Ln;
    document.getElementById("Xl").innerText=(Xl/10000).toFixed(3)+"ohm/Km"
    console.log(Xl/10000," Xl")
    var Xc=1/(2*3.142*f*Cn);
    document.getElementById("Xc").innerText=Xc.toFixed(3)+"ohm.Km";
    console.log(Xc," Xc")
   
    var Sag=calcSag(span,W,Tsion,Pr);
    document.getElementById("sag").innerText=Sag.toFixed(2)+"m";
    document.getElementById("height").innerText=30 +"m";
    document.getElementById("cweight").innerText=W +"Kg/Km";
    var Ir=(P*1000)/(Math.sqrt(3)*(V)*pFr);
    var Z=eval((R*L)+Math.cos(2*3.142*f*Ln*((10)**-3)*L));
    console.log(Z," Z")
    var Y=Math.cos(2*3.142*f*Cn*L);
    console.log(Y," y")
    var Vs=V*(1+(Y*Z)/2)+(Ir*Z);
    var E=((P*1000)/((P*1000)+((3*(Ir)**2)*(R/1000))))*100;
    // console.log(R/1000,"Kohm resistnce /n",Ir)
    console.log(E," effi")
    document.getElementById("GC").innerText=GC.toFixed(3);
    // console.log(E," effi")
    document.getElementById("e").innerText=E.toFixed(3);
    // Vr at no load...
    var Vr=Vs/(1+(Y*Z)/2);
    // vr at full load;
    var Vrf=(V/Math.sqrt(3))
    // voltage regulation....
    var VR=(Vr-Vrf)/Vrf;

    console.log(Math.abs(VR)," voltage regulation...");
    document.getElementById("VR").innerText=Math.abs(VR.toFixed(3));
    // corona loss calculation...
var Ds=Gmr;
 var Pc=coronaloss(T,Pr,Mo,Ds,V,f,Vrf);
 Pc=Pc*100;
 document.getElementById("Pc").innerText=Pc.toFixed(3)+"KW/phase/Km";
 console.log(Pc,"corona loss KW/Phase/Km");
 console.log(Pc*L,"total coronaloss")
 

// recommandation section
// efficiency
if(E.toFixed(3)>=90)
{
    document.getElementById("excellent(e)").style.backgroundColor="grey";
    document.getElementById("good(e)").style.backgroundColor="";
    document.getElementById("poor(e)").style.backgroundColor="";
   
}
else if(E.toFixed(3)>=70 && E.toFixed(3)<90)
{
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="grey";
    document.getElementById("poor(e)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(e)").style.backgroundColor="grey";
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="";
    
}
// voltage Regulation-----------------
if(Math.abs(VR.toFixed(3))<5)
{
    document.getElementById("excellent(vr)").style.backgroundColor="grey";
    document.getElementById("good(vr)").style.backgroundColor="";
    document.getElementById("poor(vr)").style.backgroundColor="";
   
}
else if(Math.abs(VR.toFixed(3))>5 && Math.abs(VR.toFixed(3))<=10)
{
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="grey";
    document.getElementById("poor(vr)").style.backgroundColor="";
    
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}
// corona powerloss----------
if(Pc.toFixed(3)<0.3)
{
    document.getElementById("excellent(pc)").style.backgroundColor="grey";
    document.getElementById("good(pc)").style.backgroundColor="";
    document.getElementById("poor(pc)").style.backgroundColor="";
   
   
}
else if(Pc.toFixed(3)>0.3 && Pc.toFixed(3)<=0.6)
{
    document.getElementById("excellent(pc)").style.backgroundColor="";
    document.getElementById("good(pc)").style.backgroundColor="grey";
    document.getElementById("poor(pc)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}







}

else{
    alert("plz ,do enter the correct format...")
}

}

// geo4-----------
function geo4Analysis()
{
    var L=document.getElementById("length").value;
    var P=document.getElementById("power").value;
    var pFr=document.getElementById("powerFactor").value;
    // var R=document.getElementById("resis").value;
    var T=document.getElementById("temp").value;
    var Pr=document.getElementById("per").value;
    var Mo=document.getElementById("ifactor").value;
    var f=document.getElementById("freq").value;
    var Tsion=document.getElementById("tsion").value;
    if (Tsion>=1 && Tsion<=5&& L>=250 && P>=50 && pFr>=0.85 && pFr<=0.95  && T>20 && T<=55 && Pr>10 && Pr<=100 && Mo>=0.8 && Mo<=1 && f>=49.5 && f<=50.5)
    {
            var V=150;
            var span=350;
            var GC=5.18+((V-33)/33)*0.3048;
            var Gmr,Ln,Cn,R,W;

    if(document.getElementById('r1').checked){
        W=1628;
        R=0.7191;
        Gmr=0.0373*0.3048; 
    }
    else if(document.getElementById('r2').checked)
    {
        W=546
        R=0.2143;
        Gmr=0.0217*0.3048;   
    }
       
    else {
        W=2433;
        R=0.04516;
        Gmr=0.0444*0.3048;
        
    }
    Ln=(0.4605)*Math.log(6.401/(Gmr*10.509));
    console.log(((Ln)),"mH/Km")   ;
    document.getElementById("L").innerText=Ln.toFixed(3)+"mH/Km";

    Cn=0.02414/(Math.log(6.401/(Gmr*10.509)));
    console.log(Cn*1000,"nF/Km")
    document.getElementById("C").innerText=(Cn*1000).toFixed(3)+"nF/Km";
    
    var Xl=2*3.142*f*Ln;
    document.getElementById("Xl").innerText=(Xl/10000).toFixed(3)+"ohm/Km"
    console.log(Xl/10000," Xl")
    var Xc=1/(2*3.142*f*Cn);
    document.getElementById("Xc").innerText=Xc.toFixed(3)+"ohm.Km";
    console.log(Xc," Xc")
    
    var Sag=calcSag(span,W,Tsion,Pr);
    document.getElementById("sag").innerText=Sag.toFixed(2) +"m";
    document.getElementById("height").innerText=33 +"m";
    document.getElementById("cweight").innerText=W +"Kg/Km";
    var Ir=(P*1000)/(Math.sqrt(3)*(V)*pFr);
    var f=document.getElementById("freq").value;
    var Z=eval((R*L)+Math.cos(2*3.142*f*Ln*((10)**-3)*L));
    console.log(Z," Z")
    var Y=Math.cos(2*3.142*f*Cn*L);
    console.log(Y," y")
    var Vs=V*(1+(Y*Z)/2)+(Ir*Z);
    var E=((P*1000)/((P*1000)+((3*(Ir)**2)*(R/1000))))*100;
    console.log(R/1000,"Kohm resistnce /n",Ir)
    console.log(E," effi")
    document.getElementById("GC").innerText=GC.toFixed(3);
    document.getElementById("e").innerText=E.toFixed(3);
    var Vr=Vs/(1+(Y*Z)/2);
    var Vrf=(V*10/Math.sqrt(3))
    var VR=(Vr-Vrf)/Vrf;
    console.log(Math.abs(VR)," voltage regulation...")
    document.getElementById("VR").innerText=Math.abs(VR.toFixed(3));
var Ds=Gmr;
 var Pc=coronaloss(T,Pr,Mo,Ds,V,f,Vrf);
 Pc=Pc*10;
 document.getElementById("Pc").innerText=Pc.toFixed(3)+"KW/phase/Km";
 console.log(Pc,"corona loss KW/Phase/Km");
 
// recommandation section
// efficiency
if(E.toFixed(3)>=90)
{
    document.getElementById("excellent(e)").style.backgroundColor="grey";
    document.getElementById("good(e)").style.backgroundColor="";
    document.getElementById("poor(e)").style.backgroundColor="";
   
}
else if(E.toFixed(3)>=70 && E.toFixed(3)<90)
{
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="grey";
    document.getElementById("poor(e)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(e)").style.backgroundColor="grey";
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="";
    
}
// voltage Regulation-----------------
if(Math.abs(VR.toFixed(3))<5)
{
    document.getElementById("excellent(vr)").style.backgroundColor="grey";
    document.getElementById("good(vr)").style.backgroundColor="";
    document.getElementById("poor(vr)").style.backgroundColor="";
   
}
else if(Math.abs(VR.toFixed(3))>5 && Math.abs(VR.toFixed(3))<=10)
{
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="grey";
    document.getElementById("poor(vr)").style.backgroundColor="";
    
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}
// corona powerloss----------
if(Pc.toFixed(3)<0.3)
{
    document.getElementById("excellent(pc)").style.backgroundColor="grey";
    document.getElementById("good(pc)").style.backgroundColor="";
    document.getElementById("poor(pc)").style.backgroundColor="";
   
   
}
else if(Pc.toFixed(3)>0.3 && Pc.toFixed(3)<=0.6)
{
    document.getElementById("excellent(pc)").style.backgroundColor="";
    document.getElementById("good(pc)").style.backgroundColor="grey";
    document.getElementById("poor(pc)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}






}

else{
    alert("plz ,do enter the correct format...")
}

}
// geo5---------------------------------------------
function geo5Analysis()
{
    var L=document.getElementById("length").value;
    var P=document.getElementById("power").value;
    var pFr=document.getElementById("powerFactor").value;
    // var R=document.getElementById("resis").value;
    var T=document.getElementById("temp").value;
    var Pr=document.getElementById("per").value;
    var Mo=document.getElementById("ifactor").value;
    var f=document.getElementById("freq").value;
    var Tsion=document.getElementById("tsion").value;
    if (Tsion>=1 && Tsion<=5&& L>=80 && L<=250 && P>=55 && pFr>=0.85 && pFr<=0.95  && T>20 && T<=55 && Pr>=10 && Pr<=100 && Mo>=0.8 && Mo<=1 && f>=49.5 && f<=50.5)
    {
            var V=69;
            var span=305;
            var GC=5.18+((V-33)/33)*0.3048;
            var Gmr,Ln,Cn,R,W;

    if(document.getElementById('r1').checked){
        R=0.7191;
        W=1628;
        Gmr=0.0373*0.3048; 
        
    }
    else if(document.getElementById('r2').checked)
    {
        R=0.2143;
        W=2433;
        Gmr=0.0217*0.3048;   
    }
       
    else {
        R=0.04516;
        W=546;
        Gmr=0.0444*0.3048;
        
    }
    Ln=(0.4605)*Math.log(5.795/(Gmr));
    console.log(((Ln)),"mH/Km")   ;
    document.getElementById("L").innerText=Ln.toFixed(3)+"mH/Km";

    Cn=0.02414/(Math.log(5.795/(Gmr)));
    console.log(Cn*1000,"nF/Km")
    document.getElementById("C").innerText=(Cn*1000).toFixed(3)+"nF/Km";
   
    var Xl=2*3.142*f*Ln;
    document.getElementById("Xl").innerText=(Xl/10000).toFixed(3)+"ohm/Km"
    console.log(Xl/10000," Xl")
    var Xc=1/(2*3.142*f*Cn);
    document.getElementById("Xc").innerText=Xc.toFixed(3)+"ohm.Km";
    console.log(Xc," Xc")
     
    var Sag=calcSag(span,W,Tsion,Pr);
    document.getElementById("sag").innerText=Sag.toFixed(2)+"m";
    document.getElementById("height").innerText=18.9 +"m";
    document.getElementById("cweight").innerText=W +"Kg/Km";


    var Ir=(P*1000)/(Math.sqrt(3)*(V)*pFr);
    var f=document.getElementById("freq").value;
    var Z=eval((R*L)+Math.cos(2*3.142*f*Ln*((10)**-3)*L));
    console.log(Z," Z")
    var Y=Math.cos(2*3.142*f*Cn*L);
    console.log(Y," y")
    var Vs=V*(1+(Y*Z)/2)+(Ir*Z);
    var E=((P*1000)/((P*1000)+((3*(Ir)**2)*(R/1000))))*100;
    console.log(R/1000,"Kohm resistnce /n",Ir)
    console.log(E," effi")
    document.getElementById("GC").innerText=GC.toFixed(3);
    document.getElementById("e").innerText=E.toFixed(3);
    var Vr=Vs/(1+(Y*Z)/2);
    var Vrf=(V*10/Math.sqrt(3))
    var VR=(Vr-Vrf)/Vrf;
    console.log(Math.abs(VR)," voltage regulation...")
    document.getElementById("VR").innerText=Math.abs(VR.toFixed(3));
var Ds=Gmr;
 var Pc=coronaloss(T,Pr,Mo,Ds,V,f,Vrf);
 Pc=Pc*100;
 document.getElementById("Pc").innerText=Pc.toFixed(3)+"KW/phase/Km";
 console.log(Pc,"corona loss KW/Phase/Km");
 // recommandation section
// efficiency
if(E.toFixed(3)>=90)
{
    document.getElementById("excellent(e)").style.backgroundColor="grey";
    document.getElementById("good(e)").style.backgroundColor="";
    document.getElementById("poor(e)").style.backgroundColor="";
   
}
else if(E.toFixed(3)>=70 && E.toFixed(3)<90)
{
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="grey";
    document.getElementById("poor(e)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(e)").style.backgroundColor="grey";
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="";
    
}
// voltage Regulation-----------------
if(Math.abs(VR.toFixed(3))<5)
{
    document.getElementById("excellent(vr)").style.backgroundColor="grey";
    document.getElementById("good(vr)").style.backgroundColor="";
    document.getElementById("poor(vr)").style.backgroundColor="";
   
}
else if(Math.abs(VR.toFixed(3))>5 && Math.abs(VR.toFixed(3))<=10)
{
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="grey";
    document.getElementById("poor(vr)").style.backgroundColor="";
    
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}
// corona powerloss----------
if(Pc.toFixed(3)<0.3)
{
    document.getElementById("excellent(pc)").style.backgroundColor="grey";
    document.getElementById("good(pc)").style.backgroundColor="";
    document.getElementById("poor(pc)").style.backgroundColor="";
   
   
}
else if(Pc.toFixed(3)>0.3 && Pc.toFixed(3)<=0.6)
{
    document.getElementById("excellent(pc)").style.backgroundColor="";
    document.getElementById("good(pc)").style.backgroundColor="grey";
    document.getElementById("poor(pc)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}







}

else{
    alert("plz ,do enter the correct format...")
}

}
// geo6-------------------------------------
function geo6Analysis()
{
    var L=document.getElementById("length").value;
    var P=document.getElementById("power").value;
    var pFr=document.getElementById("powerFactor").value;
    // var R=document.getElementById("resis").value;
    var T=document.getElementById("temp").value;
    var Pr=document.getElementById("per").value;
    var Mo=document.getElementById("ifactor").value;
    var f=document.getElementById("freq").value;
    var Tsion=document.getElementById("tsion").value;
    if (Tsion>=1 && Tsion<=5&& L>=250 && P>=50 && pFr>=0.85 && pFr<=0.95  && T>20 && T<=55 && Pr>10 && Pr<=100 && Mo>=0.8 && Mo<=1 && f>=49.5 && f<=50.5)
    {
            var V=138;
            var span=350;
            var GC=5.18+((V-33)/33)*0.3048;
            var Gmr,Ln,Cn,R,W;

    if(document.getElementById('r1').checked){
        R=0.7191;
        W=1628;
        Gmr=0.0373*0.3048; 
    }
    else if(document.getElementById('r2').checked)
    {
        R=0.2143;
        W=2433;
        Gmr=0.0217*0.3048;   
    }
       
    else {
        R=0.04516;
        W=546;
        Gmr=0.0444*0.3048;
        
    }
    Ln=((0.4605)*Math.log(37.773/(Gmr)))+((0.4605)*Math.log(37.773/((Gmr)**2)*14.44));
    console.log(((Ln)),"mH/Km")   ;
    document.getElementById("L").innerText=Ln.toFixed(3)+"mH/Km";

    Cn=(0.02414/(Math.log(37.773/(Gmr)))) + (0.02414/(Math.log(37.773/((Gmr)**2)*14.44)));
    console.log(Cn*1000,"nF/Km")
    document.getElementById("C").innerText=(Cn*1000).toFixed(3)+"nF/Km";
    
    var Xl=2*3.142*f*Ln;
    document.getElementById("Xl").innerText=(Xl/10000).toFixed(3)+"ohm/Km"
    console.log(Xl/10000," Xl")
    var Xc=1/(2*3.142*f*Cn);
    document.getElementById("Xc").innerText=Xc.toFixed(3)+"ohm.Km";
    console.log(Xc," Xc")
      

    var Sag=calcSag(span,W,Tsion,Pr);
    document.getElementById("sag").innerText=Sag.toFixed(2) +"m";
    document.getElementById("height").innerText=25.1 +"m";
    document.getElementById("cweight").innerText=W +"Kg/Km";
    var Ir=(P*1000)/(Math.sqrt(3)*(V)*pFr);
    var f=document.getElementById("freq").value;
    var Z=eval((R*L)+Math.cos(2*3.142*f*Ln*((10)**-3)*L));
    console.log(Z," Z")
    var Y=Math.cos(2*3.142*f*Cn*1000*L);
    console.log(Y," y")
    var Vs=V*(1+(Y*Z)/2)+(Ir*Z);
    var E=((P*1000)/((P*1000)+((3*(Ir)**2)*(R/1000))))*100;
    console.log(R/1000,"Kohm resistnce /n",Ir)
    console.log(E," effi")
    document.getElementById("GC").innerText=GC.toFixed(3);
    document.getElementById("e").innerText=E.toFixed(3);
    var Vr=Vs/(1+(Y*Z)/2);
    console.log(Vr," Vr")
    var Vrf=(V*10/Math.sqrt(3))
    console.log(Vrf," Vrf")
    var VR=(Vr-Vrf)/Vrf;
    console.log(Math.abs(VR)," voltage regulation...")
    document.getElementById("VR").innerText=Math.abs(VR.toFixed(3));
var Ds=Gmr;
 var Pc=coronaloss(T,Pr,Mo,Ds,V,f,Vrf);
 Pc=Pc*10;
 document.getElementById("Pc").innerText=Pc.toFixed(3)+"KW/phase/Km";
 console.log(Pc,"corona loss KW/Phase/Km");
 
// recommandation section
// efficiency
if(E.toFixed(3)>=90)
{
    document.getElementById("excellent(e)").style.backgroundColor="grey";
    document.getElementById("good(e)").style.backgroundColor="";
    document.getElementById("poor(e)").style.backgroundColor="";
   
}
else if(E.toFixed(3)>=70 && E.toFixed(3)<90)
{
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="grey";
    document.getElementById("poor(e)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(e)").style.backgroundColor="grey";
    document.getElementById("excellent(e)").style.backgroundColor="";
    document.getElementById("good(e)").style.backgroundColor="";
    
}
// voltage Regulation-----------------
if(Math.abs(VR.toFixed(3))<5)
{
    document.getElementById("excellent(vr)").style.backgroundColor="grey";
    document.getElementById("good(vr)").style.backgroundColor="";
    document.getElementById("poor(vr)").style.backgroundColor="";
   
}
else if(Math.abs(VR.toFixed(3))>5 && Math.abs(VR.toFixed(3))<=10)
{
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="grey";
    document.getElementById("poor(vr)").style.backgroundColor="";
    
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}
// corona powerloss----------
if(Pc.toFixed(3)<0.3)
{
    document.getElementById("excellent(pc)").style.backgroundColor="grey";
    document.getElementById("good(pc)").style.backgroundColor="";
    document.getElementById("poor(pc)").style.backgroundColor="";
   
   
}
else if(Pc.toFixed(3)>0.3 && Pc.toFixed(3)<=0.6)
{
    document.getElementById("excellent(pc)").style.backgroundColor="";
    document.getElementById("good(pc)").style.backgroundColor="grey";
    document.getElementById("poor(pc)").style.backgroundColor="";
    
}
else
{
    document.getElementById("poor(vr)").style.backgroundColor="grey";
    document.getElementById("excellent(vr)").style.backgroundColor="";
    document.getElementById("good(vr)").style.backgroundColor="";
    
}

}

else{
    alert("plz ,do enter the correct format...")
}

}