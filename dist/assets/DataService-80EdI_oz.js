import{a as r}from"./axios-DTyqpfTh.js";const e=r.create({baseURL:"https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint",headers:{"Cache-Control":"no-cache","Content-Type":"application/json",apiKey:"LduI7j9z7Iwppo1AbxE9TBz2z2lJFZZFF3MU5ZFCbfxHU8wMlyCjvz0pWMByVH5n","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"}}),s={getAddr(){return e.get("/folio")},postProcessnumber(t){return e.post("/process",t)},getLastProcess(){return e.get("/lastnumber")},getSlopeless(){return e.get("/slopeless")},getSlopemore(){return e.get("/slopemore")},getdeOne(){return e.get("/desupone")},getdeTwo(){return e.get("/desuptwo")},getdeThree(){return e.get("/desupthree")},getdeFour(){return e.get("/desupfour")},getZones23(){return e.get("/gableroofs23")},getNoa(){return e.get("/noa")},getSBS(){return e.get("/shinglesbs")},getSystemE(){return e.get("/systemtype")},getburMaterial(){return e.get("/burmaterial")},getnewburMaterial(){return e.get("/burmaterials")},getburSystem(){return e.get("/bursystem")},getPoly(){return e.get("/shinglepoly")},getSystemF(){return e.get("/systemtypef")},getdeGauge(){return e.get("/degauge")},getdeMaterial(){return e.get("/dematerial")},getdeMatMore(){return e.get("/dematerials")},getdeSize(){return e.get("/desize")},getdeFastener(){return e.get("/defastener")},getprimeBase(){return e.get("/primebase")},getPerimeter(){return e.get("/perimeter")},getNoas(){return e.post("/shinglenoa")},getTile(){return http.get("/tileroof")},getTiles(){return e.get("/tilenoa")},getZones(){return e.get("/gablezones")},getLay(){return e.get("/underlaymentshingle")},getContractors(){return e.get("/contractors")},postAccount(t){return e.post("/accounts",t)},getDripMaterials(){return e.get("/dripmaterials")}};export{s as D};