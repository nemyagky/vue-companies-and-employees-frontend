import iZtoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export class ErrorService {

   public static showError(text: string) {
      iZtoast.error({
         title: "Ошибка сервера",
         message: text,
         position: 'topRight'
      });
   }
}
