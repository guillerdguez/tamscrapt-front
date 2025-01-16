import { ActivatedRoute, Router } from '@angular/router';
import { GenericModel } from '../../../Model/Views/Dynamic/GenericModel';
import { UserService } from '../../../Service/user/User.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../Service/seguridad/AuthService.service';
import { Component } from '@angular/core';
import { UserAuthority } from '../../../Model/Domain/User/UserAuthority.enum';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  userAuthority = UserAuthority;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    public genericModel: GenericModel,
    public authService: AuthService,
    public router: Router
  ) {}
  ngOnChanges(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id);
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id);
  }
  ngOnDestroy(): void {}
  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }
  save(): void {
    if (this.genericModel.element) {
      this.userService.updateUser(this.genericModel.element);
      this.goBack();
    }
  }
}
