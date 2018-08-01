import Main from '@/views/Main.vue';
import Cookies from 'js-cookie';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        { path: 'dailtDetail', title: '日报详情', name: 'daily_detail', component: () => import('@/views/projectManager/daily/component/daily-detail.vue') },//用于显示日报详情
        { path: 'class_student_detail', title: '学生详情', name: 'class_student_detail', component: () => import('@/views/masterManager/master_manager/class_students_detail.vue') },//用于显示班级学生的详情
        { path: 'modify_students_message', title: '修改基础信息', name: 'modify_students_message', component: () => import('@/views/masterManager/master_manager/modify_students_message.vue') },//用于修改学生基础信息
        { path: 'modify_students_status', title: '修改学籍信息', name: 'modify_students_status', component: () => import('@/views/masterManager/master_manager/modify_students_status.vue') },//用于修改学生学籍信息
    ]
};

// 项目经理的路由
const projectManagerRouter = [
    {
        path: '/daily',
        icon: 'android-clipboard',
        name: 'daily',
        title: '日报',
        access:1,
        component: Main,
        children: [
            {
                path: '/daily',
                name: 'daily_index',
                icon:'funnel',
                title: '查看日报',
                component: () => import('@/views/projectManager/daily/daily.vue')
            },
            {
                path: '/sendDaily',
                name: 'sendDaily_index',
                icon:'paper-airplane',
                title: '发送日报',
                component: () => import('@/views/projectManager/daily/send-daily.vue')
            },
        ]
    },
    {
        path: '/students',
        icon: 'android-contacts',
        name: 'students',
        title: '学生管理',
        access:1,
        component: Main,
        children: [
            {
                path: 'pro_studentsMessage',
                name: 'pro_studentsMessage',
                title: '学生信息',
                icon:'document',
                component: () => import('@/views/projectManager/students/pro_studentsMessage.vue')
            },
            {
                path: 'pro_studentsAttendance',
                name: 'pro_studentsAttendance',
                title: '学生考勤',
                icon:'flag',
                component: () => import('@/views/projectManager/students/pro_studentsAttendance.vue')
            },
            {
                path: 'pro_studentsExamAchievement',
                name: 'pro_studentsExamAchievement',
                title: '考试成绩',
                icon:'ios-copy',
                component: () => import('@/views/projectManager/students/pro_studentsExamAchievement.vue')
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        title: '考试练习',
        icon:'happy-outline',
        access:1,
        component: Main,
        children: [
            {
                path: 'exam_index',
                name: 'exam_index',
                icon:'happy-outline',
                title: '在线考试',
                component: () => import('@/views/projectManager/test/exam.vue')
            },
            {
                path: 'exercise_index',
                name: 'exercise_index',
                icon:'happy-outline',
                title: '在线练习',
                component: () => import('@/views/projectManager/test/exercise.vue')
            }
        ]
    },
    {
        path: '/entryTopic',
        icon: 'social-buffer',
        name: 'entryTopic',
        title: '录题',
        access:1,
        component: Main,
        children: [
            {
                path: 'entryTopic_index',
                name: 'entryTopic_index',
                title: '录入题目',
                component: () => import('@/views/projectManager/entry_topic/entry_topic.vue')
            }
        ]
    },
]

// 品保主管的路由
const harryRouter=[
    {
        path: '/test_keshan',
        icon: 'android-clipboard',
        name: 'test_keshan',
        access:2,
        title: '测试页面-可删',
        component: Main,
        children: [
            { 
                path: '/test_keshan',
                name: 'test_keshan_index',
                icon:'funnel',
                title: '测试页面-可删',
                component: () => import('@/views/harry/test_keshan/test_keshan.vue')
            }
        ]
    },
    {
        path: '/manage',
        icon: 'ios-toggle-outline',
        name: 'manage',
        access:2,
        title: '基本管理',
        component: Main,
        children: [
            {
                path: 'manage_center',
                name: 'manage_center',
                icon:'location',
                title: '中心管理',
                component: () => import('@/views/harry/manage/manage_center.vue')
            },
            {
                path: 'manage_students',
                name: 'manage_students',
                icon:'android-contacts',
                title: '学生管理',
                component: () => import('@/views/harry/manage/manage_students.vue')
            },
            {
                path: 'manage_class',
                name: 'manage_class',
                icon:'bookmark',
                title: ' 班级管理',
                component: () => import('@/views/harry/manage/manage_class.vue')
            },
        ]
    },
    {
        path: '/topic',
        icon: 'filing',
        name: 'topic',
        access:2,
        title: '管理题库',
        component: Main,
        children: [
            {
                path: 'review_topic',
                name: 'review_topic',
                icon:'toggle-filled',
                title: '题目审核',
                component: () => import('@/views/harry/topic/review_topic.vue')
            },
            {
                path: 'topiv_library',
                name: 'topiv_library', 
                icon:'briefcase',
                title: '查看题库',
                component: () => import('@/views/harry/topic/topiv_library.vue')
            }
        ]
    },
    {
        path: '/recruitment',
        icon: 'filing',
        name: 'ios-cog-outline',
        title: '人才招聘',
        access:2,
        component: Main,
        children: [
            {
                path: 'test_result',
                name: 'test_result',
                icon:'ios-pie-outline',
                title: '测试结果',
                component: () => import('@/views/harry/recruitment/test_result.vue')
            },
            {
                path: 'test_paper',
                name: 'test_paper',
                icon:'ios-bookmarks-outline',
                title: '测试试卷',
                component: () => import('@/views/harry/recruitment/test_paper.vue')
            },
        ]
    },
    {
        path: '/harrydaily',
        icon: 'android-clipboard',
        name: 'harrydaily',
        access:2,
        title: '日报',
        component: Main,
        children: [
            { 
                path: '/harrydaily',
                name: 'harrydaily_index',
                icon:'funnel',
                title: '查看日报',
                component: () => import('@/views/harry/daily/daily.vue')
            }
        ]
    },
    {
        path: '/complaints',
        icon: 'sad-outline',
        name: 'complaints',
        access:2,
        title: '投诉',
        component: Main,
        children: [
            {
                path: '/complaints',
                name: 'complaints_index',
                icon:'android-sad',
                title: '查看投诉',
                component: () => import('@/views/harry/complaints/complaints.vue')
            }
        ]
    },
    {
        path: '/monitor360',
        icon: 'android-locate',
        name: 'monitor360',
        access:2,
        title: '远程监控',
        component: Main,
        children: [
            { 
                path: 'monitor360',
                name: 'monitor360_index',
                icon: 'android-locate',
                title: '远程监控',
                component: () => import('@/views/harry/monitor360/monitor360.vue')
            }
        ]
    },
    {
        path: '/proman_test',
        icon: 'sad-outline',
        access:2,
        name: 'proman_test',
        title: '项目经理考核',
        component: Main,
        children: [
            { 
                path: 'proman_test',
                name: 'proman_test_index',
                icon:'android-sad',
                title: '项目经理考核',
                component: () => import('@/views/harry/proman_test/proman_test.vue')
            }
        ]
    }
]

// 班主任的路由
const masterRouter=[
    {
        path: '/master_students',
        icon: 'android-clipboard',
        name: 'master_students',
        title: '学员管理',
        access:5,
        component: Main,
        children: [
            {
                path: '/master_manager_students',
                name: 'master_manager_students_index',
                icon:'android-contacts',
                title: '管理学生',
                component: () => import('@/views/masterManager/master_manager/master_manager_students.vue')
            },
            {
                path: '/back_school',
                name: 'back_school_index',
                icon:'ios-infinite',
                title: '复学管理',
                component: () => import('@/views/masterManager/master_manager/back_school.vue')
            }
        ]
    }
]

// 讲师的路由
const teacherRouter=[
    {
        path: '/view_daily',
        icon: 'social-buffer',
        name: 'view_daily',
        access:4,
        title: '查看日报',
        component: Main,
        children: [
            { 
                path: 'view_daily',
                name: 'view_daily_index',
                icon:'social-buffer',
                title: '查看日报',
                component: () => import('@/views/teacher/view_daily/view_daily.vue')
            }
        ]
    },
    {
        path: '/view_complaints',
        icon: 'sad-outline',
        name: 'view_complaints',
        access:4,
        title: '查看投诉',
        component: Main,
        children: [
            { 
                path: 'view_complaints',
                name: 'view_complaints_index',
                icon:'sad-outline',
                title: '查看投诉',
                component: () => import('@/views/teacher/view_complaints/view_complaints.vue')
            }
        ]
    }
]

// 冯老师的路由
const fengRouter=[
    {
        path: '/view_daily',
        icon: 'social-buffer',
        name: 'view_daily',
        access:3,
        title: '查看日报',
        component: Main,
        children: [
            { 
                path: 'view_daily',
                name: 'feng_view_daily_index',
                icon:'social-buffer',
                title: '查看日报',
                component: () => import('@/views/feng/view_daily/view_daily.vue')
            }
        ]
    },
    {
        path: '/view_complaints',
        icon: 'sad-outline',
        name: 'feng_view_complaints',
        access:3,
        title: '查看投诉',
        component: Main,
        children: [
            { 
                path: 'view_complaints',
                name: 'feng_view_complaints_index',
                icon:'sad-outline',
                title: '查看投诉',
                component: () => import('@/views/feng/view_complaints/view_complaints.vue')
            }
        ]
    },
    {
        path: '/emp_message',
        icon: 'bookmark',
        name: 'emp_message',
        access:3,
        title: '就业信息',
        component: Main,
        children: [
            { 
                path: 'emp_message',
                name: 'emp_message_index',
                icon:'bookmark',
                title: '就业信息',
                component: () => import('@/views/feng/emp_message/emp_message.vue')
            }
        ]
    },
    {
        path: '/project_view',
        icon: 'aperture',
        name: 'project_view',
        access:3,
        title: '项目总览',
        component: Main,
        children: [
            { 
                path: 'project_example',
                name: 'project_example_index',
                icon:'crop',
                title: '示例项目',
                component: () => import('@/views/feng/project_view/project_example.vue')
            },
            { 
                path: 'project_students',
                name: 'project_students_index',
                icon:'qr-scanner',
                title: '学生项目',
                component: () => import('@/views/feng/project_view/project_students.vue')
            }
        ]
    }
]

// 教学经理的路由
const teacherManagerRouter=[
    {
        path: '/manage_project',
        icon: 'ios-toggle-outline',
        name: 'manage_project',
        title: '基本管理',
        access:7,
        component: Main,
        children: [
            {
                path: 'manager_project',
                name: 'manager_project_index',
                icon:'ribbon-b',
                title: '管理项目经理',
                component: () => import('@/views/teacherManager/manage_project/manage_project.vue')
            }
        ]
    },
    {
        path: '/classes_message',
        icon: 'ios-people',
        name: 'classes_message',
        access:7,
        title: '班级信息',
        component: Main,
        children: [
            {
                path: 'classes_message',
                name: 'classes_message_index',
                icon:'ios-copy-outline',
                title: '管理班级',
                component: () => import('@/views/teacherManager/classes_message/classes_message.vue')
            }
        ]
    },
    {
        path: '/students_message',
        icon: 'ios-people',
        name: 'students_message',
        access:7,
        title: '学生信息',
        component: Main,
        children: [
            {
                path: 'students_ach',
                name: 'students_ach_index',
                icon:'ios-copy-outline',
                title: '学生成绩',
                component: () => import('@/views/teacherManager/students_message/students_ach.vue')
            }
        ]
    },
    {
        path: '/view_complaints',
        icon: 'sad-outline',
        access:7,
        name: 'teach_pro_view_complaints',
        title: '查看投诉',
        component: Main,
        children: [
            {
                path: 'teach_pro_view_complaints',
                name: 'teach_pro_view_complaints_index',
                icon:'sad-outline',
                title: '查看投诉',
                component: () => import('@/views/teacherManager/view_complaints/view_complaints.vue')
            }
        ]
    },
];


// 根据用户名, 从服务器获取角色, 配置相应路由

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里

const myRouter=[
    ...teacherManagerRouter,
    ...fengRouter,
    ...teacherRouter,
    ...harryRouter,
    ...projectManagerRouter,
    ...masterRouter
]
export const appRouter = myRouter;


// export const appRouter = [
//     ...projectManagerRouter,
//     {
//         path: '/access',
//         icon: 'key',
//         name: 'access',
//         title: '权限管理',
//         component: Main,
//         children: [
//             { path: 'index', 
//             title: '权限管理', 
//             name: 'access_index', 
//             component: () => import('@/views/access/access.vue') }
//         ]
//     },
//     {
//         path: '/access-test',
//         icon: 'lock-combination',
//         title: '权限测试页',
//         name: 'accesstest',
//         access: 0,
//         component: Main,
//         children: [
//             { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
//         ]
//     },
//     {
//         path: '/international',
//         icon: 'earth',
//         title: {i18n: 'international'},
//         name: 'international',
//         component: Main,
//         children: [
//             { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
//         ]
//     },
//     {
//         path: '/component',
//         icon: 'social-buffer',
//         name: 'component',
//         title: '组件',
//         component: Main,
//         children: [
//             {
//                 path: 'text-editor',
//                 icon: 'compose',
//                 name: 'text-editor',
//                 title: '富文本编辑器',
//                 component: () => import('@/views/my-components/text-editor/text-editor.vue')
//             },
//             {
//                 path: 'md-editor',
//                 icon: 'pound',
//                 name: 'md-editor',
//                 title: 'Markdown编辑器',
//                 component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
//             },
//             {
//                 path: 'image-editor',
//                 icon: 'crop',
//                 name: 'image-editor',
//                 title: '图片预览编辑',
//                 component: () => import('@/views/my-components/image-editor/image-editor.vue')
//             },
//             {
//                 path: 'draggable-list',
//                 icon: 'arrow-move',
//                 name: 'draggable-list',
//                 title: '可拖拽列表',
//                 component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
//             },
//             {
//                 path: 'area-linkage',
//                 icon: 'ios-more',
//                 name: 'area-linkage',
//                 title: '城市级联',
//                 component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
//             },
//             {
//                 path: 'file-upload',
//                 icon: 'android-upload',
//                 name: 'file-upload',
//                 title: '文件上传',
//                 component: () => import('@/views/my-components/file-upload/file-upload.vue')
//             },
//             {
//                 path: 'scroll-bar',
//                 icon: 'android-upload',
//                 name: 'scroll-bar',
//                 title: '滚动条',
//                 component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
//             },
//             {
//                 path: 'count-to',
//                 icon: 'arrow-graph-up-right',
//                 name: 'count-to',
//                 title: '数字渐变',
//                 // component: () => import('@/views/my-components/count-to/count-to.vue')
//                 component: () => import('@/views/my-components/count-to/count-to.vue')
//             },
//             {
//                 path: 'split-pane-page',
//                 icon: 'ios-pause',
//                 name: 'split-pane-page',
//                 title: 'split-pane',
//                 component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
//             }
//         ]
//     },
//     {
//         path: '/form',
//         icon: 'android-checkbox',
//         name: 'form',
//         title: '表单编辑',
//         component: Main,
//         children: [
//             { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
//             { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

//         ]
//     },
//     // {
//     //     path: '/charts',
//     //     icon: 'ios-analytics',
//     //     name: 'charts',
//     //     title: '图表',
//     //     component: Main,
//     //     children: [
//     //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
//     //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

//     //     ]
//     // },
//     {
//         path: '/tables',
//         icon: 'ios-grid-view',
//         name: 'tables',
//         title: '表格',
//         component: Main,
//         children: [
//             { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
//             { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
//             { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
//             { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
//             { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
//         ]
//     },
//     {
//         path: '/advanced-router',
//         icon: 'ios-infinite',
//         name: 'advanced-router',
//         title: '高级路由',
//         component: Main,
//         children: [
//             { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
//             { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
//         ]
//     },
//     {
//         path: '/error-page',
//         icon: 'android-sad',
//         title: '错误页面',
//         name: 'errorpage',
//         component: Main,
//         children: [
//             { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
//         ]
//     }
// ];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
