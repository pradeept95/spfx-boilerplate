export const FeatureResources = [
    {
        name : "Admin",
        key : "Admin",
        features : [
            {
                name : "Manage Roles",
                key : "Admin.ManageRoles",
                features : [
                    {
                        name : "View Roles",
                        key : "Admin.ManageRoles.View",
                        default : true
                    },
                    {
                        name : "Add Roles",
                        key : "Admin.ManageRoles.Add",
                    },
                    {
                        name : "Edit Roles",
                        key : "Admin.ManageRoles.Edit",
                    },
                    {
                        name : "Delete Roles",
                        key : "Admin.ManageRoles.Delete",
                    }  
                ]
            },
            {
                name : "Manage Resources",
                key : "Admin.ManageResources",
                features : [
                    {
                        name : "View Resources",
                        key : "Admin.ManageResources.View",
                        default : true
                    },
                    {
                        name : "Add Resources",
                        key : "Admin.ManageResources.Add",
                    },
                    {
                        name : "Edit Resources",
                        key : "Admin.ManageResources.Edit",
                    } 
                ]
            },
            {
                name : "Manage User Access",
                key : "Admin.ManageUserAccess",
                features : [
                    {
                        name : "View User Access",
                        key : "Admin.ManageUserAccess.View",
                        default : true
                    },
                    {
                        name : "Add User Access",
                        key : "Admin.ManageUserAccess.Add",
                    },
                    {
                        name : "Edit User Access",
                        key : "Admin.ManageUserAccess.Edit",
                    } 
                ]
            }
        ]
    },
   
]