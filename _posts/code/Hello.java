// filename: Hello.java

class HelloSuper {
    public HelloSuper() {
        System.out.println("HelloSuper");
    }

    { System.out.println("I'm Super class"); }

    static { System.out.println("static Super"); }
}

public class Hello extends HelloSuper {
    public Hello() {
        System.out.println("Hello");
    }

    { System.out.println("I'm a class"); }

    static { System.out.println("static"); }

    public static void main(String[] args) {
        System.out.println("---- main start ----");
        new HelloSuper();
        System.out.println("---- main end   ----");
    }
}
