import useTranslation from 'next-translate/useTranslation'
import { isFormal } from '~lib/config'


export const translate=function(key, options?){
    var page = 'checkin'
    if (!options) options=[] 
    if ('page' in options) page = options['page'] 

console.log('wtf   '+key)

    const {t, lang} = useTranslation(page)
    var text=''
    
    var test_text=t(key, options)
    if (test_text.indexOf(':'+key)!==-1) options['variant']=true
    

    //either the key couldnt be found in the json file or the variant option is set, 
    //either way we look for a variant     
    if ('variant' in options){
       if (typeof options['variant']=='boolean') options['variant']=process.env.NEXT_PUBLIC_BUILD_VARIANT
       
       try{
        text = require('locales/' + lang + '/' +options['variant'] )[key](options)     
       } catch(e) {
        //error handling here disabled due to some variants/keys not existing on purpose
        //  text='locale load error'
        //  console.log('locale load error')
      }
       return text
    } 

    if (isFormal==true) {
      //formal key only needs checkin if formal is true
      text=t(key+'_f', options)
      if (text.indexOf(':'+key+'_f')!==-1) text=test_text
      return text
    }
    
    return t(key, options)
}


