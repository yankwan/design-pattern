class Pubsub {
    constructor () {
        this.$listeners = {};
    }

    // 订阅
    subscribe(topic, listener) {
        let listeners = this.$listeners[topic];
        if (!listeners) {
            this.$listeners[topic] = listeners = [];
        }
        listeners.push(listener);
        // 取消订阅
        return function() {
            let index = listeners.indexOf(listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }

    // 发布事件
    publish (topic) {
        if (!this.$listeners[topic]) return;

        // 获取topic后面的输入参数
        let args = [].splice.call(arguments, 1);

        // 发布的事件对象
        let event = {
            name: topic
        }

        let listeners = this.$listeners[topic];
        listeners.forEach(listener => {
            listener.apply(null, args);
        });

        return event;
    }

}