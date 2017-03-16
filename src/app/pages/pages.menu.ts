export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      
      {
        path: 'books',
        data: {
          menu: {
            title: 'Quickbooks',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: 'cashidr',
            data: {
              menu: {
                title: 'Cash (IDR)'
              }
            }
          },{
            path: 'bcaidr',
            data: {
              menu: {
                title: 'BCA (IDR)'
              }
            }
          },{
            path: 'panin1idr',
            data: {
              menu: {
                title: 'Panin 1 (IDR)'
              }
            }
          },
          {
            path: 'panin2idr',
            data: {
              menu: {
                title: 'Panin 2 (IDR)'
              }
            }
          },
          {
            path: 'briidr',
            data: {
              menu: {
                title: 'BRI (IDR)'
              }
            }
          }
        ]
      },
      {
        path: 'forms',
        data: {
          menu: {
            title: 'New Transaction',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: 'receipt',
            data: {
              menu: {
                title: 'Receipt'
              }
            }
          },
          {
            path: 'disbursment',
            data: {
              menu: {
                title: 'Disbursment'
              }
            }
          }
        ]
      },{
        path: 'forms',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'Login'
              }
            }
          }
        ]
      }
    ]
  }
];
