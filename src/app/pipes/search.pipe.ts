import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts:any[],searchKey:string ): any[] {
    const result:any = []

     if(!allProducts || searchKey==""){
      return allProducts
     }else{
      allProducts.forEach((item:any)=>{
        if(item['title'].toLowerCase().includes(searchKey.toLowerCase())){
          result.push(item)
        }
      })
     }
     return result
  }

}
