import { ApiProperty } from '@nestjs/swagger';
import SysRoleDepartment from '@/common/entities/admin/sys-role-department.entity';
import SysRoleMenu from '@/common/entities/admin/sys-role-menu.entity';
import SysRole from '@/common/entities/admin/sys-role.entity';

export class RoleInfo {
  @ApiProperty({
    type: SysRole,
  })
  roleInfo: SysRole;

  @ApiProperty({
    type: [SysRoleMenu],
  })
  menus: SysRoleMenu[];

  @ApiProperty({
    type: [SysRoleDepartment],
  })
  depts: SysRoleDepartment[];
}

export class CreatedRoleId {
  roleId: number;
}
