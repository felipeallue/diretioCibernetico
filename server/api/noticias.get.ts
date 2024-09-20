import axios from "axios";
import * as cheerio from 'cheerio';
export default defineEventHandler(async (event) => {
    let {category} =  getQuery(event);
    let url = `https://www.cisoadvisor.com.br/categoria/${category}`;

    if(!category){
        url = `https://www.cisoadvisor.com.br/branded-posts`
    }
    let data:any = []
    let result = await axios.get(url)
      const $ = cheerio.load(result.data);
     $('.elementor-posts-container article').each((i, elem) => {
        data.push({
          title: cleanText($(elem).find('h2').text()),
          link: cleanText($(elem).find('a').attr('href')),
          image: cleanText($(elem).find('img').attr('src')),
          descr: cleanText($(elem).find('a').text())
      });
      });
    return data
  })

  function cleanText(text:string | undefined) {
    if (!text) return '';
    return text.replace(/[\t\n\r]/g, '').trim();
  }