import { firefox } from 'playwright';

async function openWebPage(numRuc) {
    console.log(numRuc)
    const browser = await firefox.launch({
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
        await page.goto('https://adevsays.com', { timeout: 60000 });
        // await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp', { timeout: 60000 });

        const result = await page.evaluate(()=>{
            const el = document.querySelector("h1");
            return {
                [el.tagName]: el.textContent
            }
        });

        // await page.click("#txtRuc");
        // await page.fill("#txtRuc", numRuc);
        // await page.click("#btnAceptar");
        // await page.waitForSelector(".list-group", { timeout: 60000, state: 'attached' });

        // const result = await page.evaluate(() => {
        //     const elemento = document.querySelectorAll('.list-group')[0].children;
         
        //     const numeroRucName =  elemento[0].children[0].children[1].children[0].innerText.trim(); // el primer corchete decide cual salir
        //     const tipoContribuyente =  elemento[1].children[0].children[1].children[0].innerText.trim();
        //     const nombreComercial = elemento[2].children[0].children[1].children[0].innerHTML.trim(); 
        //     const fechaInscripcion = elemento[3].children[0].children[1].children[0].innerText.trim();
        //     const estadoContribuyente = elemento[4].children[0].children[1].children[0].innerText.trim(); 
        //     const condicionContribuyente = elemento[5].children[0].children[1].children[0].innerText.trim(); 
        //     const domicilioFiscal = elemento[6].children[0].children[1].children[0].innerText.trim();
        //     const sistemaEmisionComprobante = elemento[7].children[0].children[1].children[0].innerText.trim();
        //     const actividadComercio = elemento[7].children[0].children[3].children[0].innerText.trim();
        //     const sistemaContabilidad = elemento[8].children[0].children[1].children[0].innerText.trim();
     
        //     const emisorElectronicoDesde = elemento[12].children[0].children[1].children[0].innerText.trim();
        //     const comprobanteElectronico = elemento[13].children[0].children[1].children[0].innerText.trim();
        //     const afiliadoAlPleDesde = elemento[14].children[0].children[1].children[0].innerText.trim();
           
          
        //     return {
        //      numeroRucName: numeroRucName,
        //      tipoContribuyente: tipoContribuyente,
        //      nombreComercial: nombreComercial,
        //      fechaInscripcion: fechaInscripcion,
        //      estadoContribuyente: estadoContribuyente,
        //      condicionContribuyente: condicionContribuyente,
        //      domicilioFiscal: domicilioFiscal,
        //      sistemaEmisionComprobante: sistemaEmisionComprobante,
        //      actividadComercio: actividadComercio,
        //      sistemaContabilidad:sistemaContabilidad,
        //      emisorElectronicoDesde:emisorElectronicoDesde,
        //      comprobanteElectronico:comprobanteElectronico,
        //      afiliadoAlPleDesde: afiliadoAlPleDesde,
          
        //     }
            
        // })
        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await browser.close();
    }
}

export { openWebPage };
