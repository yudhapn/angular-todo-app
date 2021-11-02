import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'camelCase'
})
export class CamelcasePipe implements PipeTransform {

  transform(str: string): string {
    return camalize(str);
  }

}

function camalize(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}