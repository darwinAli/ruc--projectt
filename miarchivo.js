import {chromium} from "playwright";

async function wait(timer){
    return new Promise((resolve)=>{
        setTimeout(resolve, timer);
    })
}

async function openWebPage(numRuc) {
    console.log("Entrando al scrap")
    let browser = null;

    try {

        browser = await chromium.launch({
            headless: true
        });
        console.log("cargo el navegador")
        
        const page = await browser.newPage({
            userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537' 
        });
        console.log("despues de crear una nueva page")
        
        await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp', {timeout: 60000});
        console.log("llego hasta la conexion con el link");

        await page.click("#txtRuc"),
        await page.fill("#txtRuc", numRuc),
        
        await page.click("#btnAceptar"),
        await page.waitForURL("https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias")
        console.log("Espero a la url");
        await wait(3000);
        console.log("Esperó los 3 segundos.")

        const result = await page.evaluate(async () => {
            if(!childrens) await wait(3000);
            const childrens = document.querySelector(".list-group")?.children;

            const obtenerTexto = (childrens, childIndex) => {
                return childrens.children[0].children[childIndex].children[0].innerText.trim();
            }

            const campos = [
                { nombre: 'numeroRucName', indice: 1, elementoIndice: 0 },
                { nombre: 'tipoContribuyente', indice: 1, elementoIndice: 1 },
                { nombre: 'nombreComercial', indice: 1, elementoIndice: 2 },
                { nombre: 'fechaInscripcion', indice: 1, elementoIndice: 3 },
                { nombre: 'estadoContribuyente', indice: 1, elementoIndice: 4 },
                { nombre: 'condicionContribuyente', indice: 1, elementoIndice: 5 },
                { nombre: 'domicilioFiscal', indice: 1, elementoIndice: 6 },
                { nombre: 'sistemaEmisionComprobante', indice: 1, elementoIndice: 7 },
                { nombre: 'actividadComercio', indice: 3, elementoIndice: 7 },
                { nombre: 'sistemaContabilidad', indice: 1, elementoIndice: 8 },
                { nombre: 'emisorElectronicoDesde', indice: 1, elementoIndice: 12 },
                { nombre: 'comprobanteElectronico', indice: 1, elementoIndice: 13 },
                { nombre: 'afiliadoAlPleDesde', indice: 1, elementoIndice: 14 }
            ];

            const resultado = {};

            campos.forEach((campo) => {
                resultado[campo.nombre] = obtenerTexto(childrens[campo.elementoIndice], campo.indice);
            });

            return resultado;

        })


        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await browser.close();

    }
}

export { openWebPage };




         