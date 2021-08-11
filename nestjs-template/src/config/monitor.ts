// 查看监控信息的页面地址 localhost:3000/api/status
export default {
    pageTitle: 'Nest.js 监控页面',
    port: 3000,         // 端口要与service的端口一致
    path: '/status',
    ignoreStartsWith: '/healt/alive',
    spans: [
        {
            interval: 1,
            retention: 60,
        },
        {
            interval: 5,
            retention: 60,
        },
        {
            interval: 15,
            retention: 60,
        },
    ],
    chartVisibility: { // 监测项
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
    healthChecks: [],
};