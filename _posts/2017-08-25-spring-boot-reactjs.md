---
title: "Spring Boot + React.js Web Application"
excerpt: "用 Spring Boot + React.js 创建 Web Application"
category: "technology"
analytics: true
comments: true
tags: [spring-boot, reactjs]
---
{% include JB/setup %}

<!-- TODO -->

---

## Spring Boot + React.js

### Maven Structure

工程的目录结构按照前端、后端分开。`backend`, `frontend`

```
boot-react
├───backend
│   ├───pom.xml
│   └───
├───frontend
│   ├───pom.xml
│   └───
└───pom.xml
```

根目录的POM文件：`boot-react/pom.xml`

- 配置parent为 `spring-boot-starter-parent`
- 包含子modules `frontend` `backend`，同时 `frontend` 要在 `backend` 前包含，从而会先执行 `frontend` 子module

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.zhenglinj</groupId>
  <artifactId>boot-react</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>pom</packaging>

  <name>web</name>
  <url>http://maven.apache.org</url>

  <properties>
    <java.version>1.8</java.version>
  </properties>

  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.5.4.RELEASE</version>
  </parent>

  <modules>
    <module>frontend</module>
    <module>backend</module>
  </modules>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>com.ssgx</groupId>
        <artifactId>frontend</artifactId>
        <version>${project.version}</version>
      </dependency>
    </dependencies>
  </dependencyManagement>

</project>
```

后端POM文件：`boot-react/backend/pom.xml`
- 配置parent为 `com.zhenglinj.boot-react`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>com.zhenglinj</groupId>
    <artifactId>boot-react</artifactId>
    <version>1.0-SNAPSHOT</version>
  </parent>

  <artifactId>backend</artifactId>
  <packaging>jar</packaging>

  <properties>
    <java.version>1.8</java.version>
    <start-class>com.zhenglinj.web.Application</start-class>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>

  <dependencies>
    <!-- frontend -->
    <!-- 
    <dependency>
      <groupId>com.ssgx</groupId>
      <artifactId>frontend</artifactId>
    </dependency>
    -->

    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <executions>
          <execution>
            <goals>
              <goal>repackage</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <artifactId>maven-failsafe-plugin</artifactId>
        <executions>
          <execution>
            <goals>
              <goal>integration-test</goal>
              <goal>verify</goal>
            </goals>
          </execution>
        </executions>
      </plugin>

    </plugins>
  </build>

</project>
```

`boot-react/frontend/pom.xml`
- 配置parent为 `com.zhenglinj.boot-react`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>com.zhenglinj</groupId>
    <artifactId>boot-react</artifactId>
    <version>1.0-SNAPSHOT</version>
  </parent>

  <artifactId>frontend</artifactId>
  <packaging>jar</packaging>

  <build>
    <plugins>
    <!-- ... -->
    </plugins>
  </build>
</project>
```

### Backend

[Spring Boot Offical](http://projects.spring.io/spring-boot/)  
[MyBatis Offical](http://www.mybatis.org/mybatis-3/zh/)  

### Frontend

[React](https://facebook.github.io/react/)  
[Redux](http://redux.js.org/)  
[React + Redux react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)  

### Spring Boot + React.js maven project

[SpringBoot+Reactjs boot-react](https://github.com/zhenglinj/boot-react)

