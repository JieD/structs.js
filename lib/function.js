/**
 * Proxy: creating a proxy on a particular object allows a predefined handler to get notified when something happens.
 * new API: 
 *         
 * old API: 
 *         var objectProxy = Proxy.create(handler, proto);
 *         var functionProxy = Proxy.createFunction(handler, callTrap, constructTrap);
 */
if (!Function.create) {
    Function.create = function create(call, construct) {
        var f = Proxy.createFunction(Proxy.Handler(function(){}),
                                     call,
                                     function() {
                                         var self = Object.create(f.prototype);
                                         var result = construct.apply(self, arguments);
                                         return (typeof result === "object" && result !== null)
                                              ? result
                                              : self;
                                     });
        f.prototype.constructor = f;
        return f;
    }
}
