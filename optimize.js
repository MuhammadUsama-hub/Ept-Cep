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
    alert("error");
}
return Pc;

}
// main
function optimize1()
{
    var D=document.getElementById("d").value;
    var L=260
    var P=150;
    var pFr=0.89;
    var T=35;
    var Pr=74;
    var Mo=1;
    var f=49.5;
    if ( D>=2 && D<=4)
    {
            var V=400;
            var Gmr,Ln,Cn,d,R;
    if(document.getElementById('r1').checked){
        R=0.7191;
        Gmr=0.0373*0.3048;
        d=(1.108/2)*0.0254;
    }
       

    else if(document.getElementById('r2').checked)
    {
        R=0.2143;
     
        Gmr=0.0217*0.3048;
        d=(0.642/2)*0.0254;
    }
       
    else {
        R=0.04516;
        Gmr=0.0444*0.3048;
        d=(1.382/2)*0.0254;

    }
    Ln=(0.4605)*Math.log((((9.14+D)*(9.14+D)*(18.28+D))**1/3)/(Gmr*d)**1/2);
    console.log(((Ln)),"mH/Km")   ;
    // document.getElementById("L").innerText=Ln.toFixed(3)+"mH/Km";
    Cn=0.02414/(Math.log((((9.14+D)*(9.14+D)*(18.28+D))**1/3)/((Gmr*d)**1/2)));
    console.log(Cn*1000,"nF/Km")
    // document.getElementById("C").innerText=(Cn*1000).toFixed(3)+"nF/Km";
   
    var Xl=2*3.142*f*Ln;
    // document.getElementById("Xl").innerText=(Xl/10000).toFixed(3)+"ohm/Km"
    console.log(Xl/10000," Xl")
    var Xc=1/(2*3.142*f*Cn);
    // document.getElementById("Xc").innerText=Xc.toFixed(3)+"ohm.Km";
    console.log(Xc," Xc")
   
   
    var Ir=(P*1000)/(Math.sqrt(3)*(V)*pFr);
    var Z=eval((R*L)+Math.cos(2*3.142*f*Ln*((10)**-3)*L));
    console.log(Z," Z")
    var Y=Math.cos(2*3.142*f*Cn*L);
    console.log(Y," y")
    var Vs=V*(1+(Y*Z)/2)+(Ir*Z);
    var E=((P*1000)/((P*1000)+((3*(Ir)**2)*(R/1000))))*100;
    // console.log(R/1000,"Kohm resistnce /n",Ir)
    console.log(E," effi")
    // document.getElementById("GC").innerText=GC.toFixed(3);
    // console.log(E," effi")
    // document.getElementById("e").innerText=E.toFixed(3);
    // Vr at no load...
    var Vr=Vs/(1+(Y*Z)/2);
    // vr at full load;
    var Vrf=(V*10/Math.sqrt(3))
    // voltage regulation....
    var VR=(Vr-Vrf)/Vrf;
    console.log(Math.abs(VR)," voltage regulation...")
    // document.getElementById("VR").innerText=Math.abs(VR.toFixed(3));
    // corona loss calculation...
var Ds=((Gmr*d)**1/2);
 var Pc=coronaloss(T,Pr,Mo,Ds,V,f,Vrf);
 document.getElementById("Pc").innerText=Pc.toFixed(3)+"KW/phase/Km";
 console.log(Pc,"corona loss KW/Phase/Km");

// recommandation section
// corona powerloss----------
if(Pc.toFixed(3)<0.3)
{
    document.getElementById("excellent(pc)").style.backgroundColor="grey";
   
}
else if(Pc.toFixed(3)>0.3 && Pc.toFixed(3)<=0.6)
{
   
    document.getElementById("good(pc)").style.backgroundColor="grey";
    
}
else
{
    document.getElementById("poor(pc)").style.backgroundColor="grey";
    
}

}

else{
    alert("plz ,do enter the correct format...")
}


}
function optimize2()
{
    var r=document.getElementById("r").value;
    var L=260
    var P=150;
    var pFr=0.89;
    var T=35;
    var Pr=74;
    var Mo=1;
    var f=49.5;
    if ( r>=2 && r<=4)
    {
            var V=400;
            var Gmr,Ln,Cn,d,R;
    if(document.getElementById('r-1').checked){
        R=0.7191;
        Gmr=0.0373*0.3048;
        d=((1.108/2)*0.0254)*r;
    }
       

    else if(document.getElementById('r-2').checked)
    {
        R=0.2143;
     
        Gmr=0.0217*0.3048;
        d=((0.642/2)*0.0254)*r;
    }
       
    else {
        R=0.04516;
        Gmr=0.0444*0.3048;
        d=((1.382/2)*0.0254)*r;

    }
    Ln=(0.4605)*Math.log(((9.14*9.14*18.28)**1/3)/(Gmr*d)**1/2);
    console.log(((Ln)),"mH/Km")   ;
    // document.getElementById("L").innerText=Ln.toFixed(3)+"mH/Km";
    Cn=0.02414/(Math.log(((9.14*9.14*18.28)**1/3)/((Gmr*d)**1/2)));
    console.log(Cn*1000,"nF/Km")
    // document.getElementById("C").innerText=(Cn*1000).toFixed(3)+"nF/Km";
   
    var Xl=2*3.142*f*Ln;
    // document.getElementById("Xl").innerText=(Xl/10000).toFixed(3)+"ohm/Km"
    console.log(Xl/10000," Xl")
    var Xc=1/(2*3.142*f*Cn);
    // document.getElementById("Xc").innerText=Xc.toFixed(3)+"ohm.Km";
    console.log(Xc," Xc")
   
   
    var Ir=(P*1000)/(Math.sqrt(3)*(V)*pFr);
    var Z=eval((R*L)+Math.cos(2*3.142*f*Ln*((10)**-3)*L));
    console.log(Z," Z")
    var Y=Math.cos(2*3.142*f*Cn*L);
    console.log(Y," y")
    var Vs=V*(1+(Y*Z)/2)+(Ir*Z);
    var E=((P*1000)/((P*1000)+((3*(Ir)**2)*(R/1000))))*100;
    // console.log(R/1000,"Kohm resistnce /n",Ir)
    console.log(E," effi")
    // document.getElementById("GC").innerText=GC.toFixed(3);
    // console.log(E," effi")
    // document.getElementById("e").innerText=E.toFixed(3);
    // Vr at no load...
    var Vr=Vs/(1+(Y*Z)/2);
    // vr at full load;
    var Vrf=(V*10/Math.sqrt(3))
    // voltage regulation....
    var VR=(Vr-Vrf)/Vrf;
    console.log(Math.abs(VR)," voltage regulation...")
    // document.getElementById("VR").innerText=Math.abs(VR.toFixed(3));
    // corona loss calculation...
var Ds=((Gmr*d)**1/2);
 var Pc=coronaloss(T,Pr,Mo,Ds,V,f,Vrf);
 document.getElementById("Pc1").innerText=Pc.toFixed(3)+"KW/phase/Km";
 console.log(Pc,"corona loss KW/Phase/Km");

// recommandation section
// corona powerloss----------
if(Pc.toFixed(3)<0.3)
{
    document.getElementById("excellent(pc1)").style.backgroundColor="grey";
   
}
else if(Pc.toFixed(3)>0.3 && Pc.toFixed(3)<=0.6)
{
   
    document.getElementById("good(pc1)").style.backgroundColor="grey";
    
}
else
{
    document.getElementById("poor(pc1)").style.backgroundColor="grey";
    
}

}

else{
    alert("plz ,do enter the correct format...")
}
}
