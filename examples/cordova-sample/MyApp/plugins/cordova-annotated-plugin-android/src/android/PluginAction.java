package com.appfeel.cordova.annotated.android.plugin;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface PluginAction {
    ExecutionThread thread() default ExecutionThread.MAIN;
    String actionName() default "";
    boolean isAutofinish() default true;
}
