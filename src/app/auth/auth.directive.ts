import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef); // to hold the reference of the content which should be shown conditionally
  private viewContainerRef = inject(ViewContainerRef); // takes charge of the DOM where the directive is being used

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        // console.log('SHOW ELEMENT');
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        // console.log('DO NOT SHOW ELEMENT');
        this.viewContainerRef.clear();
      }
    });
  }
}
