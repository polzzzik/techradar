package techradar_backend.techradar.entity;

import jakarta.persistence.*;

@Entity
public class Role {

    @Id
    private Long roleId;

    private String roleName;

    public Role() {
    }

    public Role(Long roleId, String role_name) {
        this.roleId = roleId;
        this.roleName = role_name;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}