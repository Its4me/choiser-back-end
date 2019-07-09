declare var M

export class MaterialService {
  static toast(text: string) {
    M.toast({html: text})
  }
}