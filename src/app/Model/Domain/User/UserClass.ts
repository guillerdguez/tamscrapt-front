// Usuario.ts
import { UserAuthority } from '../UserAuthority.enum';

export class User {
    id!: number;
    nombre!: string;
    username!: string;
    password!: string;
    authorities: Set<UserAuthority>;
    [key: string]: any;
    constructor(id: number, nombre: string, username: string, password: string, authorities: UserAuthority[] = []) {
        this.id = id;
        this.nombre = nombre;
        this.username = username;
        this.password = password;
        this.authorities = new Set(authorities);
    }

    
    tienePermiso(permiso: UserAuthority): boolean {
        return this.authorities.has(permiso);
    }

    agregarPermiso(permiso: UserAuthority): void {
        this.authorities.add(permiso);
    }

    eliminarPermiso(permiso: UserAuthority): void {
        this.authorities.delete(permiso);
    }

    listarPermisos(): UserAuthority[] {
        return Array.from(this.authorities);
    }
}
