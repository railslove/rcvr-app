import useTranslation from 'next-translate/useTranslation'


export const translate=function(key, options?){
    var page = 'checkin'
    if (options && ('page' in options)) page = options['page'] 
    const {t, lang} = useTranslation(page)
    
    if (options && ('variant' in options)){
       if (typeof options['variant']=='boolean') options['variant']=process.env.NEXT_PUBLIC_BUILD_VARIANT
       
       var text=''
       try{
        text = require('locales/' + lang + '/' +options['variant'] )[key](options)     
       } catch(e) {
        //error handling here disabled due to some variants not existing on purpose
        //text='locale load error'
        //console.log('locale load error')
      }
       
       return text
    } 
    
    return t(key, options)
}


