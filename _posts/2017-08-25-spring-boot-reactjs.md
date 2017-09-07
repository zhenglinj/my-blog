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

```
spring-boot
├───backend
│   ├───pom.xml
│   └───
├───frontend
│   ├───pom.xml
│   └───
└───pom.xml
```

`spring-boot/pom.xml`
- 配置parent为 `spring-boot-starter-parent`
- 包含子modules `frontend` `backend`，同时 `frontend` 要在 `backend` 前包含，从而会先执行 `frontend` 子module

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.zhenglinj</groupId>
	<artifactId>spring-boot</artifactId>
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

`spring-boot/backend/pom.xml`
- 配置parent为 `com.zhenglinj.spring-boot`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>com.zhenglinj</groupId>
		<artifactId>spring-boot</artifactId>
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
		<!-- tag::actuator[] -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<!-- end::actuator[] -->
		<!-- hot swapping, disable cache for template, enable live reload -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<optional>true</optional>
		</dependency>
		<!-- tag::tests[] -->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<!-- end::tests[] -->
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
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

`spring-boot/frontend/pom.xml`
- 配置parent为 `com.zhenglinj.spring-boot`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>com.zhenglinj</groupId>
		<artifactId>spring-boot</artifactId>
		<version>1.0-SNAPSHOT</version>
	</parent>

	<artifactId>frontend</artifactId>
	<packaging>jar</packaging>

	<build>
		<plugins>
			<plugin>
				<groupId>com.github.eirslett</groupId>
				<artifactId>frontend-maven-plugin</artifactId>
				<!-- NB! Set <version> to the latest released version of frontend-maven-plugin, 
					like in README.md -->
				<version>1.4</version>
				<executions>
					<execution>
						<id>install node and npm</id>
						<goals>
							<goal>install-node-and-npm</goal>
						</goals>
						<configuration>
							<!-- See https://nodejs.org/en/download/ for latest node and npm (lts) 
								versions -->
							<nodeVersion>v6.10.0</nodeVersion>
							<npmVersion>3.10.10</npmVersion>
						</configuration>
					</execution>

					<execution>
						<id>npm install</id>
						<goals>
							<goal>npm</goal>
						</goals>
						<!-- Optional configuration which provides for running any npm command -->
						<configuration>
							<arguments>install</arguments>
						</configuration>
					</execution>

					<execution>
						<id>npm run build</id>
						<goals>
							<goal>npm</goal>
						</goals>
						<configuration>
							<arguments>run build</arguments>
						</configuration>
					</execution>

					<!-- Integration Tests -->
					<execution>
						<id>npm-pre-integration-test</id>
						<goals>
							<goal>npm</goal>
						</goals>
						<configuration>
							<arguments>run pre-test</arguments>
						</configuration>
						<phase>pre-integration-test</phase>
					</execution>
					<execution>
						<id>npm-integration-test-failSafeTest</id>
						<goals>
							<goal>npm</goal>
						</goals>
						<configuration>
							<arguments>run test</arguments>
							<testFailureIgnore>true</testFailureIgnore>
						</configuration>
						<phase>integration-test</phase>
					</execution>
					<execution>
						<id>npm-integration-test-failOnError</id>
						<goals>
							<goal>npm</goal>
						</goals>
						<configuration>
							<arguments>run test</arguments>
							<failOnError>false</failOnError>
						</configuration>
						<phase>integration-test</phase>
					</execution>
					<execution>
						<id>npm-post-integration-test</id>
						<goals>
							<goal>npm</goal>
						</goals>
						<configuration>
							<arguments>run post-test</arguments>
							<testFailureIgnore>true</testFailureIgnore>
						</configuration>
						<phase>post-integration-test</phase>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
</project>
```

### Spring Boot

[Spring Boot Offical](http://projects.spring.io/spring-boot/)

### React.js

[React](https://facebook.github.io/react/)

[Redux](http://redux.js.org/)

[React-Bootstrap](https://react-bootstrap.github.io/)

[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)

### Spring Boot + React.js maven project

[Example Code](https://github.com/zhenglinj/boot-react)



