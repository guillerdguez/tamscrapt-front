import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlgoModel } from '../../../../Model/Views/Dynamic/AlgoModel';
import { UserModel } from '../../../../Model/Views/Dynamic/UserModel';
import { UserService } from '../../../../Service/User.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnChanges {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    public algoModel: AlgoModel,
    public userModel: UserModel,
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

  goBack(): void {
    this.location.back();
    this.router.navigateByUrl(this.router.url);
  }
  save(): void {
    if (this.algoModel.algo) {
      this.userService.updateUser(this.algoModel.algo);
      this.goBack();
    }
  }
}
