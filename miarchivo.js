import {chromium} from "playwright";

async function openWebPage(numRuc) {
    console.log("Entrando al scrap")
    let browser = null;

    try {

        browser = await chromium.launch({
            headless: true
        });
        console.log("cargo la pagina")
        
        const page = await browser.newPage({
            userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537' 
        });
        console.log("despues de la page")
        
        await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp', {timeout: 60000});
        console.log("llego hasta la conexion");

        await page.click("#txtRuc");
        await page.fill("#txtRuc", numRuc);
        await page.click("#btnAceptar");
        await page.waitForSelector(".list-group", {state: 'attached' });

        console.log("Wait for selector finally")
        const result = await page.evaluate(() => {
            const el = document.querySelector("h1");
            return {el:el}
            // console.log("Llegamos a evaluate");
            // const elemento = document.querySelector(".list-group").children;
            // const numeroRucName =  elemento[0].children[0].children[1].children[0].innerText.trim(); // el primer corchete decide cual salir
            // const tipoContribuyente =  elemento[1].children[0].children[1].children[0].innerText.trim();
            // const nombreComercial = elemento[2].children[0].children[1].children[0].innerHTML.trim(); 
            // const fechaInscripcion = elemento[3].children[0].children[1].children[0].innerText.trim();
            // const estadoContribuyente = elemento[4].children[0].children[1].children[0].innerText.trim(); 
            // const condicionContribuyente = elemento[5].children[0].children[1].children[0].innerText.trim(); 
            // const domicilioFiscal = elemento[6].children[0].children[1].children[0].innerText.trim();
            // const sistemaEmisionComprobante = elemento[7].children[0].children[1].children[0].innerText.trim();
            // const actividadComercio = elemento[7].children[0].children[3].children[0].innerText.trim();
            // const sistemaContabilidad = elemento[8].children[0].children[1].children[0].innerText.trim();
        
            // const emisorElectronicoDesde = elemento[12].children[0].children[1].children[0].innerText.trim();
            // const comprobanteElectronico = elemento[13].children[0].children[1].children[0].innerText.trim();
            // const afiliadoAlPleDesde = elemento[14].children[0].children[1].children[0].innerText.trim();
            
            
            // return {
            //     numeroRucName: numeroRucName,
            //     tipoContribuyente: tipoContribuyente,
            //     nombreComercial: nombreComercial,
            //     fechaInscripcion: fechaInscripcion,
            //     estadoContribuyente: estadoContribuyente,
            //     condicionContribuyente: condicionContribuyente,
            //     domicilioFiscal: domicilioFiscal,
            //     sistemaEmisionComprobante: sistemaEmisionComprobante,
            //     actividadComercio: actividadComercio,
            //     sistemaContabilidad:sistemaContabilidad,
            //     emisorElectronicoDesde:emisorElectronicoDesde,
            //     comprobanteElectronico:comprobanteElectronico,
            //     afiliadoAlPleDesde: afiliadoAlPleDesde,
            
            // }
            
        })

        // Aquí puedes agregar el código para extraer la información que necesitas de la página.
        // Por ejemplo, podrías usar page.evaluate() para ejecutar código en el contexto de la página.
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await browser.close();

    }
}

export { openWebPage };




         