/*
 * Cloudflare Trace 資訊面板
 * 僅顯示 Cloudflare CDN 資訊
 */

class httpMethod {
    static _httpRequestCallback(resolve, reject, error, response, data) {
        if (error) {
            reject(error);
        } else {
            resolve(Object.assign(response, { data }));
        }
    }

    static get(option = {}) {
        return new Promise((resolve, reject) => {
            $httpClient.get(option, (error, response, data) => {
                this._httpRequestCallback(resolve, reject, error, response, data);
            });
        });
    }
}

class loggerUtil {
    constructor() {
        this.id = randomString();
    }
    log(message) {
        console.log(`[${this.id}] [ LOG ] ${message}`);
    }
    error(message) {
        console.log(`[${this.id}] [ERROR] ${message}`);
    }
}

var logger = new loggerUtil();

function randomString(e = 6) {
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

// 解析 Cloudflare Trace 回應
function parseCloudflareTrace(traceData) {
    const result = {};
    const lines = traceData.trim().split('\n');
    lines.forEach(line => {
        const [key, ...valueParts] = line.split('=');
        result[key] = valueParts.join('=');
    });
    return result;
}

// 格式化 WARP 狀態
function formatWarpStatus(warpValue) {
    if (warpValue === 'off') {
        return 'WARP: ✗ 未啟用';
    } else if (warpValue === 'plus') {
        return 'WARP: ✓ Plus';
    } else if (warpValue === 'on') {
        return 'WARP: ✓ 已啟用';
    } else {
        return `WARP: ${warpValue}`;
    }
}

/**
 * 從 Cloudflare 取得網路資訊
 */
function getCloudflareInfo(retryTimes = 5, retryInterval = 1000) {
    httpMethod.get('https://cloudflare.com/cdn-cgi/trace').then(response => {
        if (Number(response.status) > 300) {
            throw new Error(`Request error with http status code: ${response.status}\n${response.data}`);
        }
        
        const trace = parseCloudflareTrace(response.data);
        
        // 格式化時間戳記
        const timestamp = new Date(parseFloat(trace.ts) * 1000).toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
            hour12: false
        });
        
        // 組合顯示資訊
        const content = [
            `出口 IP: ${trace.ip}`,
            `位置: ${getFlagEmoji(trace.loc)} ${trace.loc}`,
            `資料中心: ${trace.colo}`,
            `協定: ${trace.visit_scheme}`,
            `HTTP: ${trace.http}`,
            `TLS: ${trace.tls}`,
            `SNI: ${trace.sni}`,
            formatWarpStatus(trace.warp),
            `查詢時間: ${timestamp}`
        ].join('\n');

        $done({
            title: 'Cloudflare Trace',
            content: content,
            icon: 'network',
            'icon-color': '#F6821F',
        });
    }).catch(error => {
        // 重試機制
        if (retryTimes > 0) {
            logger.error(error);
            logger.log(`Retry after ${retryInterval}ms`);
            setTimeout(() => getCloudflareInfo(--retryTimes, retryInterval), retryInterval);
        } else {
            logger.error(error);
            $done({
                title: 'Cloudflare Trace',
                content: '無法取得 Cloudflare Trace 資訊\n請檢查網路連線後重試',
                icon: 'exclamationmark.triangle',
                'icon-color': '#CB1B45',
            });
        }
    });
}

/**
 * 主程式
 */
(() => {
    const retryTimes = 5;
    const retryInterval = 1000;
    const surgeMaxTimeout = 29500;
    const scriptTimeout = retryTimes * 5000 + retryTimes * retryInterval;
    
    setTimeout(() => {
        logger.log("Script timeout");
        $done({
            title: "請求逾時",
            content: "連線請求逾時\n請檢查網路連線後重試",
            icon: 'exclamationmark.triangle',
            'icon-color': '#CB1B45',
        });
    }, scriptTimeout > surgeMaxTimeout ? surgeMaxTimeout : scriptTimeout);

    logger.log("Script start");
    getCloudflareInfo(retryTimes, retryInterval);
})();
