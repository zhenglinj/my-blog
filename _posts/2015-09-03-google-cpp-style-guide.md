---
layout: post
title: "Google C++ Style Guide中英对照 (2)"
description: ""
category: "technology"
tags: [C++, google]
---
{% include JB/setup %}


<h1><a name="t0"></a>1 Classes 类</h1>
<p>Classes are thefundamental unit of code in C++. Naturally, we use them extensively. Thissection lists the main dos and don'ts you should follow when writing a class.</p>
<p>类是C++最基本的代码单元。显然它们被广泛使用。本节列出了你写一个类时，应遵循的主要原则。</p>
<h2><a name="t1"></a>1.1 DoingWork in Constructors在构造函数中做的工作</h2>
<p>Avoid doingcomplex initialization in constructors (in particular, initialization that canfail or that requires virtual method calls).</p>
<p>要避免在构造函数内进行复杂的初始化（尤其是可能会失败的初始化或是<a>调用虚函数</a><a id="_anchor_1" href="#_msocom_1" name="_msoanchor_1">[f1]</a>&nbsp;）。</p>
<p>Definition: </p>
<p>It is possibleto perform initialization in the body of the constructor.</p>
<p>定义：</p>
<p>可以在构造函数的函数体内进行初始化。</p>
<p>Pros: </p>
<p>Convenience intyping. No need to worry about whether the class has been initialized or not.</p>
<p>优点：</p>
<p>方便打字。不必担心类是否被初始化过了。</p>
<p>Cons: </p>
<p>The problemswith doing work in constructors are:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;There is no easy way forconstructors to signal errors, short of using exceptions (which are forbidden).</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;If the work fails, we now havean object whose initialization code failed, so it may be an indeterminatestate.</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;If the work calls virtualfunctions, these calls will not get dispatched to the subclass implementations.Future modification to your class can quietly introduce this problem even ifyour class is not currently subclassed, causing much confusion.</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;If someone creates a globalvariable of this type (which is against the rules, but still), the constructorcode will be called before main(), possibly breaking some implicit assumptionsin the constructor code. For instance, gflags will not yet have beeninitialized.</p>
<p>缺点：</p>
<p>在构造函数中进行工作的问题是：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;构造函数没有简单的方法来标记错误，不易于使用异常处理（被禁止的）。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;如果操作失败，我们就得到了一个初始化失败而处于不确定状态的对象。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;如果在构造函数中调用虚函数，这些调用就会依赖于子类的实现。即使你的类还没有子类，未来对你的类的改动也会悄悄的引入这个问题而带来<a>很多麻烦</a><a id="_anchor_2" href="#_msocom_2" name="_msoanchor_2">[f2]</a>&nbsp;。</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;如果某人创建了一个这个类的全局变量的实例（即使违背了之前的准则），构造函数中的代码会在主函数之前运行，这也许会违反一些构造代码中隐式的假设。例如此时一些全局符号还没有被初始化。</p>
<p>Decision: </p>
<p>Constructorsshould never call virtual functions or attempt to raise non-fatal failures. Ifyour object requires non-trivial initialization, consider using a factoryfunction or Init() method.</p>
<p>结论：</p>
<p>构造函数不应该调用虚函数或是进行可能引起非致命的错误的操作。如果你的对象需要<a>有意义的初始化</a><a id="_anchor_3" href="#_msocom_3" name="_msoanchor_3">[f3]</a>&nbsp;，考虑用一个工厂函数或是<a>Init()</a>方法<a id="_anchor_4" href="#_msocom_4" name="_msoanchor_4">[f4]</a>&nbsp;。</p>
<h2><a name="t2"></a><a name="Default_Constructors">1.2 DefaultConstructors</a> 默认构造函数</h2>
<p>You must definea default constructor if your class defines member variables and has no otherconstructors. Otherwise the compiler will do it for you, badly.</p>
<p>如果你的类定义了成员变量，且没有其它的构造函数，你必须定义一个默认构造函数。否则编译器会自动生成一个糟糕的默认构造函数。</p>
<p>Definition: </p>
<p>The defaultconstructor is called when we new a class object with no arguments. It isalways called when calling new[] (for arrays).</p>
<p>定义：</p>
<p>默认构造函数会在我们没有参数的创建对象时被调用。在我们用new[]来创建数组时总会调用默认构造函数。</p>
<p>Pros: </p>
<p>Initializingstructures by default, to hold "impossible" values, makes debuggingmuch easier.</p>
<p>优点：</p>
<p>将类初始化为“无效”值，方便调试。</p>
<p>Cons: </p>
<p>Extra work foryou, the code writer.</p>
<p>缺点：</p>
<p>对代码编写者来说，这是多余的工作。</p>
<p>Decision:</p>
<p>结论：</p>
<p>If your classdefines member variables and has no other constructors you must define adefault constructor (one that takes no arguments). It should preferablyinitialize the object in such a way that its internal state is consistent andvalid.</p>
<p>如果你的类定义了成员变量且没有其它的构造函数，你必须自己定义一个默认构造函数。把对象的内部状态初始化成一致/有效的无疑是<a>更合理的方式</a><a id="_anchor_5" href="#_msocom_5" name="_msoanchor_5">[f5]</a>&nbsp;。</p>
<p>The reason forthis is that if you have no other constructors and do not define a defaultconstructor, the compiler will generate one for you. This compiler generatedconstructor may not initialize your object sensibly.</p>
<p>这么做的理由是如果你没有定义任何的构造函数，编译器会为你生成一个。编译器生成的构造函数不一定能按你的需要初始化对象。</p>
<p>If your classinherits from an existing class but you add no new member variables, you arenot required to have a default constructor.</p>
<p>如果你的类继承自基类但又没有新增成员变量，可以不定义默认构造函数。</p>
<h2><a name="t3"></a><a name="Explicit_Constructors">1.3 Explicit Constructors</a>显式构造函数</h2>
<p>Use the C++keyword explicit for constructors with one argument.</p>
<p>在只有一个参数的构造前面加上explicit关键字。</p>
<p>Definition: </p>
<p>Normally, if aconstructor takes one argument, it can be used as a conversion. For instance,if you define Foo::Foo(string name) and then pass a string to a function thatexpects a Foo, the constructor will be called to convert the string into a Fooand will
  pass the Foo to your function for you. This can be convenient but isalso a source of trouble when things get converted and new objects createdwithout you meaning them to. Declaring a constructor explicit prevents it frombeing invoked implicitly as a conversion.</p>
<p>定义：</p>
<p>一般来说，如果一个构造函数只有一个参数，这个参数是允许进行隐式转换的。例如，如果定义了一个Foo::Foo(string name)，然后向一个接受Foo类型的参数的函数传递一个string，这个构造函数就会被调用，将string对象构建为一个Foo对象，再将这个Foo对象传递给接受它的函数。这会方便我们使用，但也会引发一类你<a>不需要的转换</a><a id="_anchor_6" href="#_msocom_6" name="_msoanchor_6">[f6]</a>&nbsp;和创建新对象的问题。将一个构造函数声明为explicit可以避免隐式转换。</p>
<p>Pros: </p>
<p>Avoidsundesirable conversions.</p>
<p>优点：</p>
<p>避免了未声明的转换。</p>
<p>Cons:</p>
<p>None.</p>
<p>缺点：</p>
<p>无。</p>
<p>Decision:</p>
<p>We require allsingle argument constructors to be explicit. Always put explicit in front ofone-argument constructors in the class definition: explicit Foo(string name);</p>
<p>The exception iscopy constructors, which, in the rare cases when we allow them, should probablynot be explicit. Classes that are intended to be transparent wrappers aroundother classes are also exceptions. Such exceptions should be clearly markedwith comments.</p>
<p>结论：</p>
<p>我们需要将所有的单参数的构造函数声明为explicit。</p>
<p>但复制构造函数除外，这是少有的我们允许进行隐式转换的场合。用于对其它类进行透明包装的类也例外。这些例外应该用注释进行明确的说明。</p>
<h2><a name="t4"></a><a name="Copy_Constructors">1.4 CopyConstructors</a> 复制构造函数</h2>
<p>Provide a copyconstructor and assignment operator only when necessary. Otherwise, disablethem with DISALLOW_COPY_AND_ASSIGN.</p>
<p>只有在必要时才提供复制构造函数和赋值运算符。否则，要用宏来禁止复制和赋值。</p>
<p>Definition: </p>
<p>The copyconstructor and assignment operator are used to create copies of objects. Thecopy constructor is implicitly invoked by the compiler in some situations, e.g.passing objects by value.</p>
<p>定义：</p>
<p>复制构造函数和赋值运算符用来创建对象的复制品。在一些场合，例如按值转递对象时，复制构造函数会被编译器隐式的调用。</p>
<p>Pros: </p>
<p>Copyconstructors make it easy to copy objects. STL containers require that allcontents be copyable and assignable. Copy constructors can be more efficientthan CopyFrom()-style workarounds because they combine construction withcopying, the compiler can elide
  them in some contexts, and they make it easierto avoid heap allocation.</p>
<p>优点：</p>
<p>复制构造函数简化了复制对象的过程。STL容器需要所有的元素都是可复制和赋值的。复制构造函数要比CopyFrom()风格的赋值函数更有效，因为它们在构造的同时还进行了复制，某些情况下编译器会省略掉这些构造操作，更容易避免在堆上分配空间。</p>
<p>Cons: </p>
<p>Implicit copyingof objects in C++ is a rich source of bugs and of performance problems. It alsoreduces readability, as it becomes hard to track which objects are being passedaround by value as opposed to by reference, and therefore where changes to anobject
  are reflected.</p>
<p>缺点：</p>
<p>在C++中隐式的复制对象很容易导致<a>错误和性能问题</a><a id="_anchor_7" href="#_msocom_7" name="_msoanchor_7">[f7]</a>&nbsp;。它也会降低可读性，因为跟踪按值传递的对象要比按引用传递的更困难，因此也很难跟踪到对象在哪被改变了。</p>
<p>Decision:</p>
<p>结论：</p>
<p>Few classes needto be copyable. Most should have neither a copy constructor nor an assignmentoperator. In many situations, a pointer or reference will work just as well asa copied value, with better performance. For example, you can pass functionparameters
  by reference or pointer instead of by value, and you can storepointers rather than objects in an STL container.</p>
<p>只有很少的类需要是可复制的。大多数类既不需要复制构造函数也不需要赋值运算符。在很多场合下，指针或引用可以像复制的值一样工作，性能还更好。例如，你可以用引用或者指针取代值来进行函数参数的传递，你也可以在STL容器中储存对象的指针而不是对象的值。</p>
<p>If your classneeds to be copyable, prefer providing a copy method, such as CopyFrom() orClone(), rather than a copy constructor, because such methods cannot be invokedimplicitly. If a copy method is insufficient in your situation (e.g. forperformance reasons,
  or because your class needs to be stored by value in anSTL container), provide both a copy constructor and assignment operator.</p>
<p>如果你的类需要是可复制的，更好的方法是提供一个复制方法，比如CopyFrom()或Clone()，而不是提供复制构造函数，因为这些方法不可能被隐式调用。如果一个复制方法不能满足你的需求（比如因为性能原因，或者是你的类需要按值存放在STL容器中），那就<a>同时提供复制构造函数和赋值运算符</a><a id="_anchor_8" href="#_msocom_8" name="_msoanchor_8">[f8]</a>&nbsp;。</p>
<p>If your classdoes not need a copy constructor or assignment operator, you must explicitlydisable them. To do so, add dummy declarations for the copy constructor andassignment operator in the private: section of your class, but do not provideany corresponding
  definition (so that any attempt to use them results in a linkerror).</p>
<p>如果你的类不需要复制构造函数或赋值运算符，你一定要显式的禁止它们。为了这么做，要将复制构造函数和赋值运算符声明为private且不提供任何的实现（这样试图调用它们就会产生链接时错误）。</p>
<p>For convenience,a DISALLOW_COPY_AND_ASSIGN macro can be used:</p>
<p>为了方便，一个DISALLOW_COPY_AND_ASSIGN宏可以定义为：</p>
<div>
  <p>// A macro to disallow the copy constructorand operator= functions</p>
  <p>// This should be used in the private:declarations for a class需要用在private域中</p>
  <p>#define DISALLOW_COPY_AND_ASSIGN(TypeName) \</p>
  <p>&nbsp;TypeName(const TypeName&amp;);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \</p>
  <p>&nbsp; voidoperator=(const TypeName&amp;)</p>
</div>
<p>Then, in classFoo:</p>
<p>这样，在类Foo中：</p>
<div>
  <p>class Foo {</p>
  <p>&nbsp;public:</p>
  <p>&nbsp;Foo(int f);</p>
  <p>&nbsp;~Foo();</p>
  <p>&nbsp;private:</p>
  <p>&nbsp;DISALLOW_COPY_AND_ASSIGN(Foo);</p>
  <p>};</p>
</div>
<h2><a name="t5"></a><a name="Structs_vs._Classes">1.5 Structsvs. Classes</a> 结构体 VS 类</h2>
<p>Use a structonly for passive objects that carry data; everything else is a class.</p>
<p><a>仅当只有数据时使用 struct</a><a id="_anchor_9" href="#_msocom_9" name="_msoanchor_9">[f9]</a>&nbsp;；其它的都用class。</p>
<p>The struct andclass keywords behave almost identically in C++. We add our own semanticmeanings to each keyword, so you should use the appropriate keyword for thedata-type you're defining.</p>
<p>在C++中，struct和class关键字几乎是一样的。我们在这两个关键字上添加自己的语义理解，以便为定义的数据类型加上恰当的关键字。</p>
<p>structs shouldbe used for passive objects that carry data, and may have associated constants,but lack any functionality other than access/setting the data members. Theaccessing/setting of fields is done by directly accessing the fields ratherthan through
  method invocations. Methods should not provide behavior but shouldonly be used to set up the data members, e.g., constructor, destructor,Initialize(), Reset(), Validate().</p>
<p>struct应该用在只有数据的对象上，可以有相关的常量，但<a>不能有存取数据成员以外的任何功能</a><a id="_anchor_10" href="#_msocom_10" name="_msoanchor_10">[f10]</a>&nbsp;，例如，构造函数，析构函数，初始化方法，重置方法，和验证对象完整性的方法。</p>
<p>If morefunctionality is required, a class is more appropriate. If in doubt, make it aclass.</p>
<p>如果需要更多的功能，用class更合适。如果不知道用哪个，就用class吧。</p>
<p>For consistencywith STL, you can use struct instead of class for functors and traits.</p>
<p>为了与STL保持一致，用结构体而不是类来实现仿函数和<a>特性</a><a id="_anchor_11" href="#_msocom_11" name="_msoanchor_11">[f11]</a>&nbsp;。</p>
<p>Note that membervariables in structs and classes have different naming rules.</p>
<p>注意到，在结构体和类中的成员变量有着不同的命名准则。</p>
<h2><a name="t6"></a><a name="Inheritance">1.6 Inheritance</a> 继承</h2>
<p>Composition isoften more appropriate than inheritance. When using inheritance, make itpublic.</p>
<p>组合要比继承更适用。用继承的时候，将继承关系声明为公开的。</p>
<p>Definition: </p>
<p>When a sub-classinherits from a base class, it includes the definitions of all the data andoperations that the parent base class defines. In practice, inheritance is usedin two major ways in C++: implementation inheritance, in which actual code isinherited
  by the child, and interface inheritance, in which only method namesare inherited.</p>
<p>定义：</p>
<p>当一个子类继承自基类时，它就引入了父类定义的所有的数据和操作符。事实上，在C++中继承主要用于两个用途：实现继承，子类从父类继承实际的代码；接口继承，子类只继承方法的名字。</p>
<p>Pros: </p>
<p>Implementationinheritance reduces code size by re-using the base class code as it specializesan existing type. Because inheritance is a compile-time declaration, you andthe compiler can understand the operation and detect errors. Interfaceinheritance can
  be used to programmatically enforce that a class expose aparticular API. Again, the compiler can detect errors, in this case, when aclass does not define a necessary method of the API.</p>
<p>优点：</p>
<p>实现继承通过重用基类的代码来减少代码量。因为继承的声明发生在编译期，你和编译器都能理解这种操作并从中找出错误。从编程角度来看，接口继承可用于强制一个类输出特定API。同样的，如果一个类没有定义API中必要的方法，编译器能找出这个错误。</p>
<p>Cons: </p>
<p>Forimplementation inheritance, because the code implementing a sub-class is spreadbetween the base and the sub-class, it can be more difficult to understand animplementation. The sub-class cannot override functions that are not virtual,so the sub-class cannot
  change implementation. The base class may also definesome data members, so that specifies physical layout of the base class.</p>
<p>缺点：</p>
<p>对于实现继承，因为子类中的实现代码是横跨基类和子类的，要理解整个实现过程变得更困难了。<a>子类不能重写基类中的非虚函数</a><a id="_anchor_12" href="#_msocom_12" name="_msoanchor_12">[f12]</a>&nbsp;，所以子类无法修改这些函数的实现。基类可能也定义了一些数据成员，还要区分基类的物理布局。</p>
<p>Decision:</p>
<p>结论：</p>
<p>All inheritanceshould be public. If you want to do private inheritance, you should beincluding an instance of the base class as a member instead.</p>
<p>所有的继承都应该是公开的。如果你想要私有的继承，应改为<a>增加一个基类的对象成员</a><a id="_anchor_13" href="#_msocom_13" name="_msoanchor_13">[f13]</a>&nbsp;。</p>
<p>Do not overuseimplementation inheritance. Composition is often more appropriate. Try torestrict use of inheritance to the "is-a" case: Bar subclasses Foo ifit can reasonably be said that Bar "is a kind of" Foo.</p>
<p>不要过度使用实现继承。组合通常来说更合适。试着将继承的使用约束为“是一种”的关系：Bar是Foo的子类，如果说Bar“是一种”Foo是合理的说法。</p>
<p>Make yourdestructor virtual if necessary. If your class has virtual methods, itsdestructor should be virtual.</p>
<p>如果必要的话，将你的析构函数写成虚函数。如果你的类中有虚方法的话，<a>这个类的析构函数应该是虚的</a><a id="_anchor_14" href="#_msocom_14" name="_msoanchor_14">[f14]</a>&nbsp;。</p>
<p>Limit the use ofprotected to those member functions that might need to be accessed fromsubclasses. Note that data members should be private.</p>
<p>对于将可能被子类使用的函数声明为受保护的作法，要限制使用。注意数据成员应该是私有的。</p>
<p>When redefiningan inherited virtual function, explicitly declare it virtual in the declarationof the derived class. Rationale: If virtual is omitted, the reader has to checkall ancestors of the class in question to determine if the function is virtualor
  not.</p>
<p>在重定义一个继承来的虚函数时，要在派生类中显式声明它为虚的。理由是：如果virtual标识符被省略了，读者就需要去检查这个类的所有的祖先以确定这个函数是不是虚函数。</p>
<h2><a name="t7"></a><a name="Multiple_Inheritance">1.7 MultipleInheritance</a> 多重继承</h2>
<p>Only very rarelyis multiple implementation inheritance actually useful. We allow multipleinheritance only when at most one of the base classes has an implementation;all other base classes must be pure interface classes tagged with the Interfacesuffix.</p>
<p>多重继承只有在非常有限的场合比较有用。我们只允许<a>有实现的基类不超过一个的多重继承</a><a id="_anchor_15" href="#_msocom_15" name="_msoanchor_15">[f15]</a>&nbsp;；所有其它的基类都应该是用Interface后缀标记的纯接口类。</p>
<p>Definition: </p>
<p>Multipleinheritance allows a sub-class to have more than one base class. We distinguishbetween base classes that are pure interfaces and those that have animplementation.</p>
<p>定义：</p>
<p>多重继承允许子类有多于一个基类。我们将基类分成纯接口基类和有实现的基类两种。</p>
<p>Pros: </p>
<p>Multipleimplementation inheritance may let you re-use even more code than singleinheritance.</p>
<p>优点：</p>
<p>多重继承能让你重用比单继承更多的代码。</p>
<p>Cons:</p>
<p>Only very rarelyis multiple implementation inheritance actually useful. When multipleimplementation inheritance seems like the solution, you can usually find adifferent, more explicit, and cleaner solution.</p>
<p>缺点：</p>
<p>多重继承只有在很少的场合才比较有用。某种场合下如果用多重继承的解决方案，你通常也能找到一种不同的、更明确和更清晰的解决方案。</p>
<p>Decision: </p>
<p>Multipleinheritance is allowed only when all superclasses, with the possible exceptionof the first one, are pure interfaces. In order to ensure that they remain pureinterfaces, they must end with the Interface suffix.</p>
<p>结论：</p>
<p>多重继承只有在所有的基类都是纯接口时才允许使用，其中第一个基类可以例外。为了能明确它们保留着纯接口的性质，它们的名字必须带着Interface的后缀。</p>
<p>Note: There isan exception to this rule on Windows.</p>
<p>注意：Windows不符合这条准则。</p>
<h2><a name="t8"></a><a name="Interfaces">1.8 Interfaces</a> 接口</h2>
<p>Classes thatsatisfy certain conditions are allowed, but not required, to end with anInterface suffix.</p>
<p>满足一些条件的类允许（但不必需）以Interface后缀结尾。</p>
<p>Definition:</p>
<p>A class is apure interface if it meets the following requirements:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;It has only public pure virtual("= 0") methods and static methods (but see below for destructor).</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;It may not have non-static datamembers.</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;It need not have anyconstructors defined. If a constructor is provided, it must take no argumentsand it must be protected.</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;If it is a subclass, it mayonly be derived from classes that satisfy these conditions and are tagged withthe Interface suffix.</p>
<p>定义：</p>
<p>如果一个类满足下列要求，它就是一个纯接口：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;它只有公开的纯虚方法（“=0”）和静态方法（但看下面的析构函数一节）。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;它没有非静态的数据成员。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;它<a>不需要定义任何构造函数</a><a id="_anchor_16" href="#_msocom_16" name="_msoanchor_16">[f16]</a>&nbsp;。提供的构造函数必须是没有参数且是受保护的。</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;如果它是一个子类，它只能从同样满足这些条件且有着Interface后缀标记的类中<a>派生出来</a><a id="_anchor_17" href="#_msocom_17" name="_msoanchor_17">[f17]</a>&nbsp;。</p>
<p>An interfaceclass can never be directly instantiated because of the pure virtual method(s)it declares. To make sure all implementations of the interface can be destroyedcorrectly, the interface must also declare a virtual destructor (in anexception to the
  first rule, this should not be pure). See Stroustrup, The C++Programming Language, 3rd edition, section 12.4 for details.</p>
<p>一个接口类不能直接生成实例，因为其中声明的纯虚方法。为了保证这个接口的所有的实现都可以被直接销毁，这个接口必须声明一个虚的析构函数。</p>
<p>Pros: </p>
<p>Tagging a classwith the Interface suffix lets others know that they must not add implementedmethods or non static data members. This is particularly important in the caseof multiple inheritance. Additionally, the interface concept is alreadywell-understood
  by Java programmers.</p>
<p>优点：</p>
<p>用Interface后缀来标识一个类能让其它人知道他们禁止向其中添加方法的实现或非静态的数据成员。这在多重继承中尤其重要。另外，接口的概念已经被Java程序员所熟知了。</p>
<p>Cons: </p>
<p>The Interfacesuffix lengthens the class name, which can make it harder to read andunderstand. Also, the interface property may be considered an implementationdetail that shouldn't be exposed to clients.</p>
<p>缺点：</p>
<p>Interface后缀增加了类名字的长度，这会令人难以阅读和理解。此外，接口特性作为实现细节不应该被暴露给客户端。</p>
<p>Decision: </p>
<p>A class may endwith Interface only if it meets the above requirements. We do not require theconverse, however: classes that meet the above requirements are not required toend with Interface.</p>
<p>结论：</p>
<p>一个类只有在满足上述要求时才能用Interface后缀。但是我们不需要相反的规则：一个满足上述条件的类不以Interface结尾。</p>
<h2><a name="t9"></a><a name="Operator_Overloading">1.9 OperatorOverloading</a> 操作符重载</h2>
<p>Do not overloadoperators except in rare, special circumstances.</p>
<p>除非在特殊场合，不要重载操作符。</p>
<p>Definition: </p>
<p>A class candefine that operators such as + and / operate on the class as if it were abuilt-in type.</p>
<p>定义：</p>
<p>一个类可以定义诸如“+“、”/“等操作符，就像内建类型一样。</p>
<p>Pros: </p>
<p>Can make codeappear more intuitive because a class will behave in the same way as built-intypes (such as int). Overloaded operators are more playful names for functionsthat are less-colorfully named, such as Equals() or Add(). For some templatefunctions
  to work correctly, you may need to define operators.</p>
<p>优点：</p>
<p>能令代码看起来更直观，因为类与内建类型有着相同的表现（比如int）。重载运算符使 Equals()、Add() 等函数名黯然失色。为了让一些函数模板正确工作，你可能必须定义某些操作符。</p>
<p>Cons: </p>
<p>While operatoroverloading can make code more intuitive, it has several drawbacks:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;It can fool our intuition intothinking that expensive operations are cheap, built-in operations.</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;It is much harder to find thecall sites for overloaded operators. Searching for Equals() is much easier thansearching for relevant invocations of ==.</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Some operators work on pointerstoo, making it easy to introduce bugs. Foo + 4 may do one thing, while &amp;Foo+ 4 does something totally different. The compiler does not complain for eitherof these, making this very hard to debug.</p>
<p>缺点：</p>
<p>操作符重载能令代码更直观的同时，它也有着一些缺点：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;这会误导我们的直觉，使我们相信代价昂贵的操作其实是廉价的内建操作。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;想发现重载的操作的调用点变得更困难了。查找Equals()发生的位置要比查找“==“操作符来的容易得多。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;一些操作符也工作在指针上，这更容易引入bug。Foo+4是一种操作，而&amp;Foo+4却是完全不同的另一种操作。编译器是不会抱怨这种事的，这导致很难对此进行调试。</p>
<p>Overloading alsohas surprising ramifications. For instance, if a class overloads unaryoperator&amp;, it cannot safely be forward-declared.</p>
<p>重载也有一些令人惊奇的衍生物。例如，如果一个类重载了一元操作符&amp;，就不能安全的进行前向声明了。</p>
<p>Decision:</p>
<p>结论：</p>
<p>In general, donot overload operators. The assignment operator (operator=), in particular, isinsidious and should be avoided. You can define functions like Equals() andCopyFrom() if you need them. Likewise, avoid the dangerous unary operator&amp;at all costs,
  if there's any possibility the class might be forward-declared.</p>
<p>一般来说不要重载操作符。尤其是赋值操作符隐蔽性很高，应该避免重载它。你可以定义像Equals()和CopyFrom()这样的函数。同样的，一个类只要有可能被前向声明，就不要重载危险的一元操作符&amp;。</p>
<p>However, theremay be rare cases where you need to overload an operator to interoperate withtemplates or "standard" C++ classes (such asoperator&lt;&lt;(ostream&amp;, const T&amp;) for logging). These are acceptableif fully justified, but you should try to avoid these
  whenever possible. Inparticular, do not overload operator== or operator&lt; just so that your classcan be used as a key in an STL container; instead, you should create equalityand comparison functor types when declaring the container.</p>
<p>但是，也有一些少见的情况，你需要重载操作符来与模板或是标准C++类交互（例如operator&lt;&lt;(ostream&amp;,const T&amp;)）。只有被证明是完全合理的才能重载，但还是要尽量避免重载。尤其是，不要为了类能充当STL容器的键值就重载“==“或”&lt;“；你应该在声明容器的时候用”==“和”&lt;“的仿函数算子。</p>
<p>Some of the STLalgorithms do require you to overload operator==, and you may do so in thesecases, provided you document why.</p>
<p>一些STL算法确实需要你重载“==“，你可以这么做，但需要在文档内写明。</p>
<p>See also CopyConstructors and Function Overloading.</p>
<h2><a name="t10"></a><a name="Access_Control">1.10 AccessControl</a> 访问控制</h2>
<p>Make datamembers private, and provide access to them through accessor functions asneeded (for technical reasons, we allow data members of a test fixture class tobe protected when using Google Test). Typically a variable would be called foo_and the accessor
  function foo(). You may also want a mutator functionset_foo(). Exception: static const data members (typically called kFoo) neednot be private.</p>
<p>令数据成员为私有的，并在需要的时候提供取值函数（由于技术原因，我们允许使用谷歌测试时，测试夹具类的数据成员是被保护的）。典型的例子，一个变量被称foo_，它的取值函数就是foo()。你也可能需要一个用于改变的函数set_foo()。例外：静态常量数据成员（名为kFoo）不需要是私有的。</p>
<p>The definitionsof accessors are usually inlined in the header file.</p>
<p>取值函数经常被定义为头文件中的在线函数。</p>
<p>See alsoInheritance and Function Names.</p>
<h2><a name="t11"></a><a name="Declaration_Order">1.11 DeclarationOrder</a> 声明顺序</h2>
<p>Use thespecified order of declarations within a class: public: before private:,methods before data members (variables), etc.</p>
<p>在类中使用特定的声明顺序：公开的要在私有的前面，方法要在数据成员前面，等等。</p>
<p>Your classdefinition should start with its public: section, followed by its protected:section and then its private: section. If any of these sections are empty, omitthem.</p>
<p>你的类的定义应该从公开成员部分开始，接着是受保护成员，最后是私有成员。如果哪部分是空的就省略掉。</p>
<p>Within eachsection, the declarations generally should be in the following order:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;Typedefs and Enums</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;Constants (static const datamembers)</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Constructors</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;Destructor</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;Methods, including staticmethods</p>
<p>6.&nbsp;&nbsp;&nbsp;&nbsp;Data Members (except staticconst data members)</p>
<p>在每部分中，声明通常应该按下面的顺序排列：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;自定义别名和枚举</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;常量（静态常量）</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;构造函数</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;析构函数</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;方法，包括静态方法</p>
<p>6.&nbsp;&nbsp;&nbsp;&nbsp;数据成员（除了静态常量成员）</p>
<p>Frienddeclarations should always be in the private section, and theDISALLOW_COPY_AND_ASSIGN macro invocation should be at the end of the private:section. It should be the last thing in the class. See Copy Constructors.</p>
<p>友元声明总应该在私有部分，禁止复制和赋值宏应该放到私有部分的最后。它应该是类中最后的东西。</p>
<p>Methoddefinitions in the corresponding .cc file should be the same as the declarationorder, as much as possible.</p>
<p>在关联的.cc文件中方法的定义的顺序应该尽量与它被声明的顺序相同。</p>
<p>Do not put largemethod definitions inline in the class definition. Usually, only trivial orperformance-critical, and very short, methods may be defined inline. See InlineFunctions for more details.</p>
<p>不要在类定义体内将很大的方法定义在线化。通常，只有琐碎的或性能很重要的，以及非常短的方法才能被定义为在线的。</p>
<h2><a name="t12"></a><a name="Write_Short_Functions">1.12 WriteShort Functions</a> 写短的函数</h2>
<p>Prefer small andfocused functions.</p>
<p>优先选择短的目的性强的函数。</p>
<p>We recognizethat long functions are sometimes appropriate, so no hard limit is placed onfunctions length. If a function exceeds about 40 lines, think about whether itcan be broken up without harming the structure of the program.</p>
<p>我们认识到有时长的函数也是合适的，所以在函数的长度上没有硬性限制。如果一个函数超过了40行，就要考虑能否在不伤害到程序的结构的前提下将它拆分。</p>
<p>Even if yourlong function works perfectly now, someone modifying it in a few months may addnew behavior. This could result in bugs that are hard to find. Keeping yourfunctions short and simple makes it easier for other people to read and modifyyour code.</p>
<p>即使你的长函数工作得非常好，把它拆分成几个更小的函数也可能增加新的表现。函数太长可能会引起难以察觉的bug。保持你的函数短而简洁，能让其它人更容易阅读和修改你的代码。</p>
<p>You could findlong and complicated functions when working with some code. Do not beintimidated by modifying existing code: if working with such a function provesto be difficult, you find that errors are hard to debug, or you want to use apiece of it in several
  different contexts, consider breaking up the functioninto smaller and more manageable pieces.</p>
<p>你工作时可能会发现又长又复杂的函数。不要害怕修改已经存在的代码：和这样的函数工作很困难，你会发现错误很难调试，或者你想将它用在一些不同的场合，考虑把这个函数拆分成几段更小更容易管理的片段吧。</p>
<h1><a name="t13"></a>2 Google-SpecificMagic 谷歌特有的技巧</h1>
<p>There arevarious tricks and utilities that we use to make C++ code more robust, andvarious ways we use C++ that may differ from what you see elsewhere.</p>
<p>我们使用许多窍门和实用技巧来让C++代码更强健，我们使用C ++的各种方法也可能不同于你在其它地方见到的。</p>
<h2><a name="t14"></a><a name="Smart_Pointers">2.1 SmartPointers</a> 智能指针</h2>
<p>If you actuallyneed pointer semantics, scoped_ptr is great. You should only usestd::tr1::shared_ptr with a non-const referent when it is truly necessary toshare ownership of an object (e.g. inside an STL container). You should neveruse auto_ptr.</p>
<p>如果你确实需要用智能指针，scoped_ptr完全能胜任。在真正需要<a>分享一个对象的所有权</a><a id="_anchor_18" href="#_msocom_18" name="_msoanchor_18">[f18]</a>&nbsp;时（例如在STL容器内），你应该只使用std::tr1::shared_ptr指向非常量的所指物。永远不要用auto_ptr。</p>
<p>Definition: </p>
<p>"Smart"pointers are objects that act like pointers, but automate management of theunderlying memory.</p>
<p>定义：</p>
<p>智能指针是表现得像指针的对象，但可以自动管理低层的内存。</p>
<p>Pros: </p>
<p>Smart pointersare extremely useful for preventing memory leaks, and are essential for writingexception-safe code. They also formalize and document the ownership ofdynamically allocated memory.</p>
<p>优点：</p>
<p>智能指针在避免内存泄露上非常的有用，在写异常安全的代码上也必不可少。他们也能令动态分配内存的所有权变得正规化和文档化。</p>
<p>Cons: </p>
<p>We preferdesigns in which objects have single, fixed owners. Smart pointers which enablesharing or transfer of ownership can act as a tempting alternative to a carefuldesign of ownership semantics, leading to confusing code and even bugs in whichmemory is
  never deleted. The semantics of smart pointers (especially auto_ptr)can be nonobvious and confusing. The exception-safety benefits of smartpointers are not decisive, since we do not allow exceptions.</p>
<p>缺点：</p>
<p>我们更喜欢设计<a>单一的明确所有者的对象</a><a id="_anchor_19" href="#_msocom_19" name="_msoanchor_19">[f19]</a>&nbsp;。允许共享或转移所有权的智能指针表现的像是可以替代所有权上的小心设计，但却导致了令人迷惑的代码，甚至还有<a>内存根本没释放的</a>bug<a id="_anchor_20" href="#_msocom_20" name="_msoanchor_20">[f20]</a>&nbsp;。智能指针（尤其是auto_ptr）的语义既非显著又令人迷惑。智能指针在异常安全性上的收益也不够决定性，因为我们不允许使用异常。</p>
<p>Decision:</p>
<p>结论：</p>
<p>scoped_ptr&nbsp;&nbsp;&nbsp; Straightforward and risk-free. Use whereverappropriate.</p>
<p>明确而没有风险。应该在任何适合的场合使用。</p>
<p><a>auto_ptr</a><a id="_anchor_21" href="#_msocom_21" name="_msoanchor_21">[f21]</a>&nbsp;&nbsp;&nbsp;&nbsp; Confusing and bug-prone ownership-transfersemantics. Do not use.
</p>
<p>在所有权转移的语义上令人迷惑且漏洞百出。不要使用。</p>
<p>shared_ptr&nbsp;&nbsp;&nbsp; Safe with const referents (i.e.shared_ptr&lt;const T&gt;). Reference-counted pointers with non-const referentscan occasionally be the best design, but try to rewrite with single ownerswhere possible.
</p>
<p>在指向物为常量时是安全的（如shared_ptr&lt;const T&gt;）。在指向物是非常量时引用计数的指针偶尔会是最佳设计，但要试着在可能的场合将它改写为单所有者的形式。</p>
<h2><a name="t15"></a><a name="cpplint">2.2 cpplint</a> c++代码静态检查工具</h2>
<p>Use cpplint.pyto detect style errors.</p>
<p>用cpplint.py来检查格式错误。</p>
<p>cpplint.py is atool that reads a source file and identifies many style errors. It is notperfect, and has both false positives and false negatives, but it is still avaluable tool. False positives can be ignored by putting // NOLINT at the endof the line.</p>
<p>cpplint.py读取源文件并标记出许多格式错误。它并不完美，既有误报也有漏报，但仍然是一个很有价值的工具。可以在行尾加上//NOLINT来忽略掉误报。</p>
<p>Some projectshave instructions on how to run cpplint.py from their project tools. If theproject you are contributing to does not, you can download cpplint.pyseparately.</p>
<h1><a name="t16"></a>3 Other C++Features 其它C++特性</h1>
<h2><a name="t17"></a><a name="Reference_Arguments">3.1 ReferenceArguments</a> 引用参数</h2>
<p>All parameterspassed by reference must be labeled const.</p>
<p>所有按引用传递的参数必须被标记为常量。</p>
<p>Definition: </p>
<p>In C, if afunction needs to modify a variable, the parameter must use a pointer, eg intfoo(int *pval). In C++, the function can alternatively declare a referenceparameter: int foo(int &amp;val).</p>
<p>定义：</p>
<p>在C中，如果一个函数需要修改一个变量，就必须使用指针参数，如int foo(int *pval)。在C++中，函数还可以声明一个引用参数：intfoo(int &amp;val)。</p>
<p>Pros: </p>
<p>Defining aparameter as reference avoids ugly code like (*pval)++. Necessary for someapplications like copy constructors. Makes it clear, unlike with pointers, thata null pointer is not a possible value.</p>
<p>优点：</p>
<p>将参数定义为引用能避免像(*pval)++这样丑陋的代码。在一些应用场合必须使用引用，比如复制构造函数。而且更明确, <a>不接受 NULL </a>指针<a id="_anchor_22" href="#_msocom_22" name="_msoanchor_22">[f22]</a>&nbsp;.</p>
<p>Cons: </p>
<p>References canbe confusing, as they have value syntax but pointer semantics.</p>
<p>缺点：</p>
<p>引用在语法上像值，语义上像指针，这可能会令人迷惑。</p>
<p>Decision:</p>
<p>结论：</p>
<p>Within functionparameter lists all references must be const:</p>
<p>函数参数表中所有的引用都必须是常量：</p>
<div>
  <p>void Foo(const string &amp;in, string *out);</p>
</div>
<p>In fact it is avery strong convention in Google code that input arguments are values or constreferences while output arguments are pointers. Input parameters may be constpointers, but we never allow non-const reference parameters.</p>
<p>事实上这在谷歌是种硬性规定：输入参数是值或常量引用，输出参数是指针。输入参数也可以是常量指针，但不允许使用非常量的引用参数。</p>
<p>However, thereare some instances where using const T* is preferable to const T&amp; for inputparameters. For example:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;You want to pass in a nullpointer.</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;The function saves a pointer orreference to the input.</p>
<p>但是也有一些场合用const T*当输入参数要比const T&amp;好。例如：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;你想传递进空指针。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;这个函数要<a>保存指向输入的指针或引用</a><a id="_anchor_23" href="#_msocom_23" name="_msoanchor_23">[f23]</a>&nbsp;。</p>
<p>Remember that mostof the time input parameters are going to be specified as const T&amp;. Usingconst T* instead communicates to the reader that the input is somehow treateddifferently. So if you choose const T* rather than const T&amp;, do so for aconcrete reason;
  otherwise it will likely confuse readers by making them lookfor an explanation that doesn't exist.</p>
<p>要记住大多数情况下输入参数都应该是常量引用。用常量指针的时候就是告诉读者输入要被特殊对待了。所以如果你要用常量指针就要有个明确的理由；否则就会迷惑读者去寻找不存在的例外情况。</p>
<h2><a name="t18"></a><a name="Function_Overloading">3.2 FunctionOverloading</a> 函数重载</h2>
<p>Use overloadedfunctions (including constructors) only if a reader looking at a call site canget a good idea of what is happening without having to first figure out exactlywhich overload is being called.</p>
<p>只能在这种情况下使用重载函数（包括构造函数）：读者一看调用语句就能清楚发生了什么，而不用首先去查看究竟哪个版本的函数被调用了。</p>
<p>Definition:</p>
<p>You may write afunction that takes a const string&amp; and overload it with another that takesconst char*.</p>
<p>定义：</p>
<p>你可以写一个接受const string&amp;参数的函数，再写一个接受const char*版本的重载函数。</p>
<div>
  <p>class MyClass {</p>
  <p>&nbsp;public:</p>
  <p>&nbsp; voidAnalyze(const string &amp;text);</p>
  <p>&nbsp; voidAnalyze(const char *text, size_t textlen);</p>
  <p>};</p>
</div>
<p>Pros: </p>
<p>Overloading canmake code more intuitive by allowing an identically-named function to takedifferent arguments. It may be necessary for templatized code, and it can beconvenient for Visitors.</p>
<p>优点：</p>
<p>通过允许函数名字相同但参数不同，重载能令代码更直观。对于模板化的代码重载也是必要的，也能方便使用。</p>
<p>Cons: </p>
<p>If a function isoverloaded by the argument types alone, a reader may have to understand C++'scomplex matching rules in order to tell what's going on. Also many people areconfused by the semantics of inheritance if a derived class overrides only someof the
  variants of a function.</p>
<p>缺点：</p>
<p>如果一个函数只通过参数来区分各个重载版本，读者可能需要去理解C++的复杂的匹配原则才能知道发生了什么。而如果一个派生类只重写了一部分版本的函数，许多人也会被<a>继承的语义</a><a id="_anchor_24" href="#_msocom_24" name="_msoanchor_24">[f24]</a>&nbsp;所迷惑。</p>
<p>Decision: </p>
<p>If you want tooverload a function, consider qualifying the name with some information aboutthe arguments, e.g., AppendString(), AppendInt() rather than just Append().</p>
<p>结论：</p>
<p>如果你想要重载一个函数，考虑一下将函数的名字改成带有一定的参数的信息而不是重载，例如，AppendString()和AppendInt()而不是只有一个Append()。</p>
<h2><a name="t19"></a><a name="Default_Arguments">3.3 DefaultArguments</a> 默认参数</h2>
<p>We do not allowdefault function parameters, except in limited situations as explained below.Simulate them with function overloading instead, if appropriate.</p>
<p>我们不允许使用默认函数参数，除非是下面解释的几种情况。如果合适的话，用函数重载模拟它。</p>
<p>Pros: </p>
<p>Often you have afunction that uses default values, but occasionally you want to override thedefaults. Default parameters allow an easy way to do this without having todefine many functions for the rare exceptions. Compared to overloading thefunction, default
  arguments have a cleaner syntax, with less boilerplate and aclearer distinction between 'required' and 'optional' arguments.</p>
<p>优点：</p>
<p>多数情况下，你写的函数可能会用到很多的默认值，但偶尔你也会修改这些默认值，无须为了这些罕见的情况定义很多的函数，用默认参数就能很轻松的做到这点。</p>
<p>Cons: </p>
<p>Functionpointers are confusing in the presence of default arguments, since the functionsignature often doesn't match the call signature. Adding a default argument toan existing function changes its type, which can cause problems with codetaking its address.
  Adding function overloads avoids these problems. Inaddition, default parameters may result in bulkier code since they arereplicated at every call-site -- as opposed to overloaded functions, where"the default" appears only in the function definition.</p>
<p>缺点：</p>
<p>存在默认参数时很难写函数指针，因为函数的形式和调用的形式经常不匹配。给一个已经存在的函数增加一个默认参数就会改变它的类型，这会导致使用函数地址的代码出现问题。增加一个重载的函数能避免这些问题。此外，默认参数可能会导致笨重的代码，因为每次调用时都会复制一次这些参数值――与重载函数截然相反，其中“默认的”仅出现在函数的定义体内。</p>
<p>Decision:</p>
<p>结论：</p>
<p>While the consabove are not that onerous, they still outweigh the (small) benefits of defaultarguments over function overloading. So except as described below, we requireall arguments to be explicitly specified.</p>
<p>虽然上述的缺点不那么夸张，仍然超过了默认参数相比函数重载的带来的收益。</p>
<p>One specificexception is when the function is a static function (or in an unnamednamespace) in a .cc file. In this case, the cons don't apply since thefunction's use is so localized.</p>
<p>一个例外是，如果是.cc文件中（或在未命名空间内）的静态函数，因为函数的使用很局限，这些缺点就体现不出来了。</p>
<p>Another specificexception is when default arguments are used to simulate variable-lengthargument lists.</p>
<p>另一个例外是在用默认参数来模拟变长参数表时。</p>
<div>
  <p>// Support up to 4 params by using a defaultempty AlphaNum.最多支持4个参数</p>
  <p>string StrCat(const AlphaNum &amp;a,</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const AlphaNum &amp;b = gEmptyAlphaNum,</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const AlphaNum &amp;c = gEmptyAlphaNum,</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const AlphaNum &amp;d = gEmptyAlphaNum);</p>
</div>
<h2><a name="t20"></a><a name="Variable-Length_Arrays_and_alloca__">3.4 Variable-LengthArrays and alloca()</a> 变长数组和alloca()</h2>
<p>We do not allowvariable-length arrays or <a>alloca()</a><a id="_anchor_25" href="#_msocom_25" name="_msoanchor_25">[f25]</a>&nbsp;.</p>
<p>不允许使用变长数组或alloca()函数。</p>
<p>Pros: </p>
<p>Variable-lengtharrays have natural-looking syntax. Both variable-length arrays and alloca()are very efficient.</p>
<p>优点：</p>
<p>变长数组语法很自然，且和alloca()一样有着很高的效率。</p>
<p>Cons: </p>
<p>Variable-lengtharrays and alloca are not part of Standard C++. More importantly, they allocatea data-dependent amount of stack space that can trigger difficult-to-findmemory overwriting bugs: "It ran fine on my machine, but dies mysteriouslyin production".</p>
<p>缺点：</p>
<p>变长数组和alloca()函数不是标准C++的一部分。更重要的是，它们在栈上分配的空间与实际的数据有关，可能会导致一些很难发现的<a>内存覆盖</a><a id="_anchor_26" href="#_msocom_26" name="_msoanchor_26">[f26]</a>&nbsp;问题：“在我的机器上好使，但发布出去就莫名其妙的<a>退出</a><a id="_anchor_27" href="#_msocom_27" name="_msoanchor_27">[f27]</a>&nbsp;了”。</p>
<p>Decision: </p>
<p>Use a safeallocator instead, such as scoped_ptr/scoped_array.</p>
<p>结论：</p>
<p>换个更安全的分配工具，如<a>scoped_ptr/scoped_array</a><a id="_anchor_28" href="#_msocom_28" name="_msoanchor_28">[f28]</a>&nbsp;。</p>
<h2><a name="t21"></a><a name="Friends">3.5 Friends</a> 友元</h2>
<p>We allow use offriend classes and functions, within reason.</p>
<p>我们允许有理由的使用友元类和函数。</p>
<p>Friends shouldusually be defined in the same file so that the reader does not have to look inanother file to find uses of the private members of a class. A common use of friendis to have a FooBuilder class be a friend of Foo so that it can construct theinner
  state of Foo correctly, without exposing this state to the world. In somecases it may be useful to make a unittest class a friend of the class it tests.</p>
<p>友元应该应该是定义在同一个文件内的，读者因此不需要去其它文件中查看类的私有成员是如何被使用的。一种很常见的使用友元的方法是令FooBuilder类为Foo类的友元，这样前者就可以正确的构建Foo的内部状态，而不用将这个内部状态暴露给外界。有时将单元测试类设置为待测试类的友元会很有用。</p>
<p>Friends extend,but do not break, the encapsulation boundary of a class. In some cases this isbetter than making a member public when you want to give only one other classaccess to it. However, most classes should interact with other classes solelythrough
  their public members.</p>
<p><a>友元</a><a id="_anchor_29" href="#_msocom_29" name="_msoanchor_29">[f29]</a>&nbsp;扩展了，而不是打破了类的封装的界限。在一些情况下只对一个其它类公开访问权限，要比公开一个成员更好。但是，大多数类还是应该只通过公开成员来与其它类互动。</p>
<h2><a name="t22"></a><a name="Exceptions">3.6 Exceptions</a> 异常</h2>
<p>We do not useC++ exceptions.</p>
<p>我们不使用C++的异常。</p>
<p>Pros:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;Exceptions allow higher levelsof an application to decide how to handle "can't happen" failures indeeply nested functions, without the obscuring and error-prone bookkeeping oferror codes.</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;Exceptions are used by mostother modern languages. Using them in C++ would make it more consistent withPython, Java, and the C++ that others are familiar with.</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Some third-party C++ librariesuse exceptions, and turning them off internally makes it harder to integratewith those libraries.</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;Exceptions are the only way fora constructor to fail. We can simulate this with a factory function or anInit() method, but these require heap allocation or a new "invalid"state, respectively.</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;Exceptions are really handy intesting frameworks.</p>
<p>优点：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;异常允许上层应用程序决定如何处理底层嵌套函数出现的“不该发生“的错误，而不是用模糊且易错的<a>错误码记录</a><a id="_anchor_30" href="#_msocom_30" name="_msoanchor_30">[f30]</a>&nbsp;。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;大数数其它现代语言中都包含异常。在C++中使用异常有助于保持与Python、Java和其它与C++类似的语言的兼容。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;一些第三方C++库使用异常，如果禁用异常的话就很难与这些库整合了。</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;异常是处理构造函数失败的唯一方法。我们能用工厂函数或Init()来模拟这个特性，但这些分别需要进行堆的分配或是新增一个“无效”状态。</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;在测试框架内异常很容易使用。</p>
<p>Cons:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;When you add a throw statementto an existing function, you must examine all of its transitive callers. Eitherthey must make at least the basic exception safety guarantee, or they mustnever catch the exception and be happy with the program terminating
  as a result.For instance, if f() calls g() calls h(), and h throws an exception that fcatches, g has to be careful or it may not clean up properly.</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;More generally, exceptions makethe control flow of programs difficult to evaluate by looking at code:functions may return in places you don't expect. This causes maintainabilityand debugging difficulties. You can minimize this cost via some rules on
  howand where exceptions can be used, but at the cost of more that a developerneeds to know and understand.</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Exception safety requires bothRAII and different coding practices. Lots of supporting machinery is needed tomake writing correct exception-safe code easy. Further, to avoid requiringreaders to understand the entire call graph, exception-safe code must
  isolatelogic that writes to persistent state into a "commit" phase. Thiswill have both benefits and costs (perhaps where you're forced to obfuscatecode to isolate the commit). Allowing exceptions would force us to always paythose costs even when they're not
  worth it.</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;Turning on exceptions adds datato each binary produced, increasing compile time (probably slightly) andpossibly increasing address space pressure.</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;The availability of exceptionsmay encourage developers to throw them when they are not appropriate or recoverfrom them when it's not safe to do so. For example, invalid user input shouldnot cause exceptions to be thrown. We would need to make the style
  guide evenlonger to document these restrictions!</p>
<p>缺点：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;在现有函数中增加throw语句时，你必须检查所有调用点。所有调用点必须至少做出基本的异常安全保证，否则永远捕捉不到这个异常，而只能“笑着“面对程序终止的结果。例如，如果f()调用了g()，g()调用了h()，h抛出的异常被f捕捉，那g就需要当心是否未妥善处理。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;更普遍地，使用异常导致只看代码很难评估程序的控制流：函数可能会在你不期望的位置返回。这加大了维护和调试的难度。你可以通过规定异常使用的方式和位置来降低开销，但是让开发人员必须掌握并理解这些规定带来的代价更大。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;异常安全需要同时使用RAII和不同编程实践。想轻松写出正确的异常安全的代码需要很多支持机制。另外，要避免要求读者理解整个调用体系，异常安全的代码必须将<a>写入持久化状态的逻辑</a><a id="_anchor_31" href="#_msocom_31" name="_msoanchor_31">[f31]</a>&nbsp;隔离到“提交“阶段。这么做既有收益也有开销（也许你被迫故意写出模糊的代码来隔离提交）。允许异常会强迫我们总是承担这些开销，就算我们觉得不划算。</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;开启异常会增加每个二进制文件的数据量，延长编译时间（可能是轻微的），还有可能增加<a>地址空间压力</a><a id="_anchor_32" href="#_msocom_32" name="_msoanchor_32">[f32]</a>&nbsp;。</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;允许使用异常，可能会怂恿开发者在不恰当的场合抛出异常或是在不安全的地方从异常中恢复。例如，用户输入不合法不应该抛出异常。如果我们要完全列出这些约束, 这份风格指南会长出很多！</p>
<p>Decision:</p>
<p>结论：</p>
<p>On their face,the benefits of using exceptions outweigh the costs, especially in newprojects. However, for existing code, the introduction of exceptions hasimplications on all dependent code. If exceptions can be propagated beyond anew project, it also becomes
  problematic to integrate the new project intoexisting exception-free code. Because most existing C++ code at Google is notprepared to deal with exceptions, it is comparatively difficult to adopt newcode that generates exceptions.</p>
<p>表面上看，使用异常利大于弊，尤其是在新项目中。但对于现有的代码，引入异常会牵连到所有相关的代码。如果新项目允许传播异常，当与现有的无异常的代码整合的时候也会出问题。因为谷歌现有的大多数C++代码都不包含异常，引入能产生异常的新代码时比较困难。</p>
<p>Given thatGoogle's existing code is not exception-tolerant, the costs of using exceptionsare somewhat greater than the costs in a new project. The conversion processwould be slow and error-prone. We don't believe that the available alternativesto exceptions,
  such as error codes and assertions, introduce a significantburden.</p>
<p>鉴于谷歌现有的代码不接受异常，使用异常的开销比在新项目中使用要大一些。转换过程缓慢且易错。我们相信异常机制的替代品，如错误码和断言，不会带来显著的负担。</p>
<p>Our adviceagainst using exceptions is not predicated on philosophical or moral grounds,but practical ones. Because we'd like to use our open-source projects at Googleand it's difficult to do so if those projects use exceptions, we need to adviseagainst exceptions
  in Google open-source projects as well. Things wouldprobably be different if we had to do it all over again from scratch.</p>
<p>我们不是基于哲学或道德层面反对使用异常，而是在实践的基础上。因为在谷歌我们希望用我们的开源项目，而这些项目很难使用异常，所以我们也不建议在谷歌开源项目中使用异常。如果我们不得不从头开始，事情可能就不同了。</p>
<p>There is anexception to this rule (no pun intended) for Windows code.</p>
<p>对于 Windows 代码来说, 有个特例.</p>
<h2><a name="t23"></a><a name="Run-Time_Type_Information__RTTI_">3.7 Run-TimeType Information (RTTI)</a> 运行时类型信息</h2>
<p>Avoid using RunTime Type Information (RTTI).</p>
<p>避免使用RTTI。</p>
<p>Definition: </p>
<p>RTTI allows aprogrammer to query the C++ class of an object at run time. This is done by useof typeid or dynamic_cast.</p>
<p>定义：</p>
<p>RTTI允许程序在运行时查看C++对象的类型。这是用typeid或dynamic_cast做到的。</p>
<p>Cons:</p>
<p>缺点：</p>
<p>Querying thetype of an object at run-time frequently means a design problem. Needing toknow the type of an object at runtime is often an indication that the design ofyour class hierarchy is flawed.</p>
<p>总是需要在运行时查看对象的类型就意味着设计有问题。需要在运行时获得对象的类型经常象征着你的类的体系设计的有缺陷。</p>
<p>Undisciplineduse of RTTI makes code hard to maintain. It can lead to type-based decisiontrees or switch statements scattered throughout the code, all of which must beexamined when making further changes.</p>
<p>混乱的使用RTTI会导致代码难以维护。它会导致贯穿代码的类型选择树或开关语句，而这些在代码修改后都需要重新检查一遍。</p>
<p>Pros:</p>
<p>优点：</p>
<p>The standardalternatives to RTTI (described below) require modification or redesign of theclass hierarchy in question. Sometimes such modifications are infeasible orundesirable, particularly in widely-used or mature code.</p>
<p>RTTI的替代品（在下面有描述）需要修改或重设计有问题的类体系。有时进行这样的修改不可行也不受欢迎，尤其是广泛使用的或成熟和代码。</p>
<p>RTTI can beuseful in some unit tests. For example, it is useful in tests of factoryclasses where the test has to verify that a newly created object has theexpected dynamic type. It is also useful in managing the relationship betweenobjects and their mocks.</p>
<p>RTTI在一些单元测试中很有用。例如，在测试工厂类时需要验证新创建的类是否是期望的动态类型，这时RTTI就很有用了。在管理对象与它的<a>模仿品</a><a id="_anchor_33" href="#_msocom_33" name="_msoanchor_33">[f33]</a>&nbsp;的关系时RTTI也有用处。</p>
<p>RTTI is usefulwhen considering multiple abstract objects. Consider</p>
<p>在考虑到多个抽象对象时，RTTI很有用。如：</p>
<div>
  <p>bool Base::Equal(Base* other) = 0;</p>
  <p>bool Derived::Equal(Base* other) {</p>
  <p>&nbsp;Derived* that = dynamic_cast&lt;Derived*&gt;(other);</p>
  <p>&nbsp; if(that == NULL)//other的类型不是Derived</p>
  <p>&nbsp;&nbsp;&nbsp;return false;</p>
  <p>&nbsp; ...</p>
  <p>}</p>
</div>
<p>Decision:</p>
<p>结论：</p>
<p>RTTI haslegitimate uses but is prone to abuse, so you must be careful when using it.You may use it freely in unittests, but avoid it when possible in other code.In particular, think twice before using RTTI in new code. If you find yourselfneeding to write
  code that behaves differently based on the class of an object,consider one of the following alternatives to querying the type:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;Virtual methods are thepreferred way of executing different code paths depending on a specificsubclass type. This puts the work within the object itself.</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;If the work belongs outside theobject and instead in some processing code, consider a double-dispatchsolution, such as the Visitor design pattern. This allows a facility outsidethe object itself to determine the type of class using the built-in typesystem.</p>
<p>RTTI有着正当的用途，但很容易被滥用，所以用的时候一定要小心。在单元测试中你可以随便用，但在其它场合就要尽量避免用它。尤其在新代码中使用RTTI要三思。如果你发现你需要写对于不同类型的对象有着不同的行为的代码，就考虑用下面的一种方法<a>来获取其类</a><a id="_anchor_34" href="#_msocom_34" name="_msoanchor_34">[f34]</a>&nbsp;型：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;不同子类执行不同代码的情况下推荐使用虚函数。这就把工作交给对象自己了。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;如果要进行的工作属于类外面的处理代码，考虑使用双重分派方案，如访问者模式。这种方法允许在对象之外确定其内在类型。</p>
<p>When the logicof a program guarantees that a given instance of a base class is in fact aninstance of a particular derived class, then a dynamic_cast may be used freelyon the object. Usually one can use a static_cast as an alternative in suchsituations.</p>
<p>当程序的逻辑保证给定的基类实例实际是某个特定的派生类时，就可以在这个对象上随意用dynamic_cast了。通常在这些场合也能用static_<a>cast</a><a id="_anchor_35" href="#_msocom_35" name="_msoanchor_35">[f35]</a>&nbsp;。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p>Decision treesbased on type are a strong indication that your code is on the wrong track.</p>
<p>类型决策树强烈的象征着你的代码走错路了。</p>
<div>
  <p>if (typeid(*data) == typeid(D1)) {</p>
  <p>&nbsp; ...</p>
  <p>} else if (typeid(*data) == typeid(D2)) {</p>
  <p>&nbsp; ...</p>
  <p>} else if (typeid(*data) == typeid(D3)) {</p>
  <p>...</p>
</div>
<p>Code such asthis usually breaks when additional subclasses are added to the classhierarchy. Moreover, when properties of a subclass change, it is difficult tofind and modify all the affected code segments.</p>
<p>在类体系中新增子类后，这样的代码通常就不能用了。另外，当一个子类的属性改变后，很难找到并修改所有受影响的语句。</p>
<p>Do nothand-implement an RTTI-like workaround. The arguments against RTTI apply justas much to workarounds like class hierarchies with type tags. Moreover,workarounds disguise your true intent.</p>
<p>不要实现一个貌似RTTI的变通方案。我们反对使用RTTI的理由也同样适用于在类体系内加上类型标签的作法。此外，变通方案会掩盖你的真实<a>意图</a><a id="_anchor_36" href="#_msocom_36" name="_msoanchor_36">[f36]</a>&nbsp;。</p>
<h2><a name="t24"></a><a name="Casting">3.8 Casting</a> 转换</h2>
<p>Use C++ castslike static_cast&lt;&gt;(). Do not use other cast formats like int y = (int)x;or int y = int(x);.</p>
<p>用C++中的static_cast&lt;&gt;来进行转换，不要用C风格的强制转换。</p>
<p>Definition: </p>
<p>C++ introduced adifferent cast system from C that distinguishes the types of cast operations.</p>
<p>定义：</p>
<p>C++中引入了与C不同的转换系统，它用多种不同的转换操作符来区分各种操作。</p>
<p>Pros: </p>
<p>The problem withC casts is the ambiguity of the operation; sometimes you are doing a conversion(e.g., (int)3.5) and sometimes you are doing a cast (e.g.,(int)"hello"); C++ casts avoid this. Additionally C++ casts are morevisible when searching for them.</p>
<p>优点：</p>
<p>C风格的转换的主要问题是操作的含义太模糊了：有时是数值转换（如(int)3.5），有时是类型转换（如(int)”hello”）；C++的转换就避免了这<a>一点</a><a id="_anchor_37" href="#_msocom_37" name="_msoanchor_37">[f37]</a>&nbsp;。另外，C++的转换更容易被搜索到。</p>
<p>Cons: </p>
<p>The syntax isnasty.</p>
<p>缺点：</p>
<p>语法令人不快。</p>
<p>Decision:</p>
<p>结论：</p>
<p>Do not useC-style casts. Instead, use these C++-style casts.</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;Use static_cast as theequivalent of a C-style cast that does value conversion, or when you need to explicitlyup-cast a pointer from a class to its superclass.</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;Use const_cast to remove theconst qualifier (see const).</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Use reinterpret_cast to dounsafe conversions of pointer types to and from integer and other pointertypes. Use this only if you know what you are doing and you understand thealiasing issues.</p>
<p>不要使用C风格的转换。改用C++风格的转换。</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;用static_cast进行数值转换，或是显式的将一个类的指针转为它的子类的指针。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;用const_cast去掉常量性质。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;用reinterpret_cast进行不安全的指针间转换或整型转指针操作。只有在你清楚操作的含义及可能的后果时才能使用这种转换。</p>
<p>See the RTTIsection for guidance on the use of dynamic_cast.</p>
<p>看RTTI节来了解dynamic_cast的使用。</p>
<h2><a name="t25"></a><a name="Streams">3.9 Streams</a> 流</h2>
<p>Use streams onlyfor logging.</p>
<p>只在日志记录的时候用流。</p>
<p>Definition: </p>
<p>Streams are areplacement for printf() and scanf().</p>
<p>定义：</p>
<p>流是用来替代printf()和scanf()的。</p>
<p>Pros: </p>
<p>With streams,you do not need to know the type of the object you are printing. You do nothave problems with format strings not matching the argument list. (Though withgcc, you do not have that problem with printf either.) Streams have automaticconstructors
  and destructors that open and close the relevant files.</p>
<p>优点：</p>
<p>通过流，你不需要知道你打印的对象是什么类型。你不会遇到格式字符串与参数列表不匹配的问题。（虽然gcc中printf也没有这个问题。）流能通过构造函数和析构函数自动的打开和关闭相关文件。</p>
<p>Cons: </p>
<p>Streams make itdifficult to do functionality like pread(). Some formatting (particularly thecommon format string idiom %.*s) is difficult if not impossible to doefficiently using streams without using printf-like hacks. Streams do notsupport operator reordering
  (the %1s directive), which is helpful forinternationalization.</p>
<p>缺点：</p>
<p>流使得<a>pread()</a>等功能函数<a id="_anchor_38" href="#_msocom_38" name="_msoanchor_38">[f38]</a>&nbsp;很难执行。一些格式化操作（尤其是常见的字符串格式符%.*s），如果不用printf风格的格式字符串，很难用流高效的实现。流不支持操作符重排序（%1s指令），而这对于国际化很有帮助。</p>
<p>Decision:</p>
<p>结论：</p>
<p>Do not usestreams, except where required by a logging interface. Use printf-like routinesinstead.</p>
<p>不要用流，除非需要一个日志记录接口。用类似于printf的程序代替它。</p>
<p>There arevarious pros and cons to using streams, but in this case, as in many othercases, consistency trumps the debate. Do not use streams in your code.</p>
<p>流有许多的优点和缺点，但在这里，像许多其它情况一样，对一致性的需要结束了辩论。不要在你的代码中用流。</p>
<h3><a name="t26"></a>Extended Discussion 扩展讨论</h3>
<p>There has beendebate on this issue, so this explains the reasoning in greater depth. Recallthe Only One Way guiding principle: we want to make sure that whenever we do acertain type of I/O, the code looks the same in all those places. Because ofthis, we
  do not want to allow users to decide between using streams or usingprintf plus Read/Write/etc. Instead, we should settle on one or the other. Wemade an exception for logging because it is a pretty specialized application,and for historical reasons.</p>
<p>这个问题上有争论，所以这里在更深的层次解释原因。回想一下唯一性原则指导规则：我们希望在任何时候都只使用一种确定的 I/O 类型，使代码在所有 I/O 处都保持一致。因此我们不想允许用户去决定是用流还是用printf+read/write。相反，我们应该确定用其中一个。我们将日志记录设为一种例外，因为这是一种很具体的应用，而且还有历史原因。</p>
<p>Proponents ofstreams have argued that streams are the obvious choice of the two, but theissue is not actually so clear. For every advantage of streams they point out,there is an equivalent disadvantage. The biggest advantage is that you do notneed to know
  the type of the object to be printing. This is a fair point. But,there is a downside: you can easily use the wrong type, and the compiler willnot warn you. It is easy to make this kind of mistake without knowing whenusing streams.</p>
<p>流的支持者争论说流显然是两者中更好的一个，但观点并非如此清晰。他们指出的流的每个优势同时也是劣势。流最大的优势就在于你不需要知道要打印的对象的类型。这是个亮点。同时也是个不足：你容易弄错类型，而编译器不会警告你。用流的时候很容易出了这种错自己还不知道。</p>
<div>
  <p>cout &lt;&lt; this;&nbsp; // Prints the address打印地址</p>
  <p>cout &lt;&lt; *this;&nbsp; // Prints the contents打印内容</p>
</div>
<p>The compilerdoes not generate an error because &lt;&lt; has been overloaded. We discourageoverloading for just this reason.</p>
<p>因为&lt;&lt;操作符被重载了，编译器不会产生错误。我们就因为这个原因不推荐重载操作符。</p>
<p>Some say printfformatting is ugly and hard to read, but streams are often no better. Considerthe following two fragments, both with the same typo. Which is easier todiscover?</p>
<p>有人说printf格式串很丑，难以阅读，但流也没好到哪去。考虑下面的两个片段，两个都有相同的打字错误，哪个更容易被发现？</p>
<div>
  <p>cerr &lt;&lt; "Error connecting to'" &lt;&lt; foo-&gt;bar()-&gt;hostname.first</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;&lt; ":" &lt;&lt; foo-&gt;bar()-&gt;hostname.second&lt;&lt; ": " &lt;&lt; strerror(errno);</p>
  <p>&nbsp;</p>
  <p>fprintf(stderr, "Error connecting to'%s:%u: %s",</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foo-&gt;bar()-&gt;hostname.first, foo-&gt;bar()-&gt;hostname.second,</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;strerror(errno));</p>
</div>
<p>And so on and soforth for any issue you might bring up. (You could argue, "Things would bebetter with the right wrappers," but if it is true for one scheme, is itnot also true for the other? Also, remember the goal is to make the languagesmaller, not add
  yet more machinery that someone has to learn.)</p>
<p>还有你可能会提出的等等等等任何问题。（你可能争论：“把流封装一下就会比较好了”，但这里可以了，其它方面呢？而且要记住，我们的目标是让语言变得更小，而不是加上更多需要学习的机制）</p>
<p>Either pathwould yield different advantages and disadvantages, and there is not a clearlysuperior solution. The simplicity doctrine mandates we settle on one of themthough, and the majority decision was on printf + read/write.</p>
<p>每种选择都会有不同的优势和劣势，分不出高下。按朴素主义的要求我们要从中选择一种，而大多数人的选择是用printf+read/write。</p>
<h2><a name="t27"></a><a name="Preincrement_and_Predecrement">3.10 Preincrementand Predecrement</a> 前缀++和前缀--</h2>
<p>Use prefix form(++i) of the increment and decrement operators with iterators and othertemplate objects.</p>
<p>对于迭代器和其他模板对象使用前缀形式 (++i) 的自增、自减运算符。</p>
<p>Definition: </p>
<p>When a variableis incremented (++i or i++) or decremented (--i or i--) and the value of theexpression is not used, one must decide whether to preincrement (decrement) orpostincrement (decrement).</p>
<p>定义：</p>
<p>一个变量在自加（++i或i++）或自减（--i或i--），而没有用到表达式的值时，必须确定到底用哪种形式。</p>
<p>Pros: </p>
<p>When the returnvalue is ignored, the "pre" form (++i) is never less efficient thanthe "post" form (i++), and is often more efficient. This is becausepost-increment (or decrement) requires a copy of i to be made, which is thevalue of the expression. If i
  is an iterator or other non-scalar type, copyingi could be expensive. Since the two types of increment behave the same when thevalue is ignored, why not just always pre-increment?</p>
<p>优点：</p>
<p>忽略返回值时，前缀形式（++i）至少不会比后缀形式（i++）效率低，常常更高。这是因为后缀自加（或自减）需要保存i的原始值作为表达式的值。如果i是迭代器或其它非标量类型，复制操作代价可能会很昂贵。既然忽略表达式的值时两种表示方法都一样，为什么不一直用前缀形式呢？</p>
<p>Cons: </p>
<p>The traditiondeveloped, in C, of using post-increment when the expression value is not used,especially in for loops. Some find post-increment easier to read, since the"subject" (i) precedes the "verb" (++), just like inEnglish.</p>
<p>C的传统写法是用后缀形式，尤其是在循环中。有人说后缀形式容易阅读，因为名词i放到了动词++的前面，和英语写法类似。</p>
<p>Decision: </p>
<p>For simplescalar (non-object) values there is no reason to prefer one form and we alloweither. For iterators and other template types, use pre-increment.</p>
<p>结论：</p>
<p>如果是标量（非对象）值，选哪种都行。对于迭代器和其它模板类型，要用前缀形式。</p>
<h2><a name="t28"></a><a name="Use_of_const">3.11 Use ofconst</a> 常量的使用</h2>
<p>Use constwhenever it makes sense.</p>
<p>能用常量的时候都要用常量。</p>
<p>Definition: </p>
<p>Declaredvariables and parameters can be preceded by the keyword const to indicate thevariables are not changed (e.g., const int foo). Class functions can have theconst qualifier to indicate the function does not change the state of the classmember variables
  (e.g., class Foo { int Bar(char c) const; };).</p>
<p>定义：</p>
<p>变量和参数声明时，可以在前面加上关键字const以表示这个变量的值不会被改变（例如constint foo）。类的成员函数也可以加const，表示这个函数不会改变类的成员变量的状态。</p>
<p>Pros: </p>
<p>Easier forpeople to understand how variables are being used. Allows the compiler to dobetter type checking, and, conceivably, generate better code. Helps peopleconvince themselves of program correctness because they know the functions theycall are limited
  in how they can modify your variables. Helps people know whatfunctions are safe to use without locks in multi-threaded programs.</p>
<p>优点：</p>
<p>容易让人理解变量的使用方式。允许编译器更好的进行类型检查，以及，可知能产生更好的代码。帮助人们相信程序的正确性，因为他们知道调用的函数不会修改他们的变量。帮助人们知道在多线程环境下什么函数不需要互斥锁也是安全的。</p>
<p>Cons: </p>
<p>const is viral:if you pass a const variable to a function, that function must have const inits prototype (or the variable will need a const_cast). This can be aparticular problem when calling library functions.</p>
<p>缺点：</p>
<p>const就像病毒：如果你向函数传递了常量参数，函数的原型中就需要写上const（否则需要用const_cast转换变量）。在调用库函数时这确实是个问题。</p>
<p>Decision:</p>
<p>结论：</p>
<p>const variables,data members, methods and arguments add a level of compile-time type checking;it is better to detect errors as soon as possible. Therefore we stronglyrecommend that you use const whenever it makes sense to do so:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;If a function does not modifyan argument passed by reference or by pointer, that argument should be const.</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;Declare methods to be constwhenever possible. Accessors should almost always be const. Other methodsshould be const if they do not modify any data members, do not call anynon-const methods, and do not return a non-const pointer or non-const referenceto
  a data member.</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Consider making data membersconst whenever they do not need to be modified after construction.</p>
<p>常量的变量、数据成员、方法、和参数会多一层编译期类型检查；这能更快的检查出错误。因此我们强烈的建议你要在任何能用const的地方这么做。</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;如果函数不会修改传递来的引用或指针参数，这个参数应该是常量。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;任何能声明为const的函数都要如此声明。取值函数总该是const。其它函数如果不修改任何成员的值，也不调用任何非常量的方法，且不返回指向数据成员的非常量的指针引用时，也应该声明为const。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;如果一个数据成员在构造结束后就不会改变了，就考虑将它声明为常量。</p>
<p>The mutablekeyword is allowed but is unsafe when used with threads, so thread safetyshould be carefully considered first.</p>
<p>关键字mutable可以使用，但在多线程下不安全，使用时应该先考虑线程安全性。</p>
<h3><a name="t29"></a>Where to put the const 把const放在哪</h3>
<p>Some peoplefavor the form int const *foo to const int* foo. They argue that this is morereadable because it's more consistent: it keeps the rule that const alwaysfollows the object it's describing. However, this consistency argument doesn'tapply in codebases
  with few deeply-nested pointer expressions since most constexpressions have only one const, and it applies to the underlying value. Insuch cases, there's no consistency to maintain. Putting the const first isarguably more readable, since it follows English
  in putting the"adjective" (const) before the "noun" (int).</p>
<p>有人更喜欢int const *foo的形式，而不是const int *foo。他们说这么更有可读性，因为这种做法更有一致性：它满足这样一条规则，const应该总是跟着它修饰的对象。但是，这种一致性的说法并不适用于深度嵌套的指针表达式很少的代码库，因为大多数常量表达式只有一个const符，一致性的价值体现的不明显。这种情况下不用维护一致性。有观点认为把const放前面更容易阅读，因为它满足英语语法：把形容性（const）放到名字(int）前。</p>
<p>That said, whilewe encourage putting const first, we do not require it. But be consistent withthe code around you!</p>
<p>总之，我们鼓励将const放前面，但不必须。但代码中两种风格的使用要保持一致。</p>
<h2><a name="t30"></a><a name="Integer_Types">3.12 IntegerTypes</a> 整数类型</h2>
<p>Of the built-inC++ integer types, the only one used is int. If a program needs a variable of adifferent size, use a precise-width integer type from &lt;stdint.h&gt;, such asint16_t.</p>
<p>C++的内建整数类型中，只使用int。如果程序中需要用到其它大小的变量，用&lt;stdint.h&gt;中带精度的整数类型，如int16_t。</p>
<p>Definition: </p>
<p>C++ does notspecify the sizes of its integer types. Typically people assume that short is16 bits, int is 32 bits, long is 32 bits and long long is 64 bits.</p>
<p>定义：</p>
<p>C++没有指定各个整数类型的大小。通常假定短整型是16位的，整型是32位的，长整型是32位的，长长整型是64位的。</p>
<p>Pros: </p>
<p>Uniformity ofdeclaration.</p>
<p>优点：</p>
<p>声明一致。</p>
<p>Cons: </p>
<p>The sizes ofintegral types in C++ can vary based on compiler and architecture.</p>
<p>缺点：</p>
<p>整型的大小依赖于编译器和架构。</p>
<p>Decision:</p>
<p>结论：</p>
<p>&lt;stdint.h&gt;defines types like int16_t, uint32_t, int64_t, etc. You should always use thosein preference to short, unsigned long long and the like, when you need aguarantee on the size of an integer. Of the C integer types, only int should beused. When appropriate,
  you are welcome to use standard types like size_t andptrdiff_t.</p>
<p>&lt;stdint.h&gt;中定义了如int16_t、uint32_t、int64_t等类型。如果你要求确保整型的大小，你应该用这些类型替代short，unsigned long long等写法。在C的整型类型中，只有int可以用。合适的话，你最好用标准类型，如size_t和ptrdiff_t。</p>
<p>We use int veryoften, for integers we know are not going to be too big, e.g., loop counters.Use plain old int for such things. You should assume that an int is at least 32bits, but don't assume that it has more than 32 bits. If you need a 64-bitinteger type,
  use int64_t or uint64_t.</p>
<p>我们经常用int，用在不会特别大的整数上，如循环计数器。这时要用POD类型int。你应该假设int至少有32位，但不要假设它超过32位。如果你需要用64位整数，就用int64_t或uint64_t。</p>
<p>For integers weknow can be "big", use int64_t.</p>
<p>对于可能会很大的整数，用int64_t。</p>
<p>You should notuse the unsigned integer types such as uint32_t, unless the quantity you arerepresenting is really a bit pattern rather than a number, or unless you needdefined twos-complement overflow. In particular, do not use unsigned types tosay a number
  will never be negative. Instead, use assertions for this.</p>
<p>你不应该用无符号整型，如uint32_t，除非你在表示一个位组而不是数字，或是你需要定义二进制补码溢出。尤其是，不要为了指出数值永不为负而使用无符号数。你应该用断言。</p>
<h3><a name="t31"></a>On Unsigned Integers 无符号整数</h3>
<p>Some people,including some textbook authors, recommend using unsigned types to representnumbers that are never negative. This is intended as a form ofself-documentation. However, in C, the advantages of such documentation areoutweighed by the real bugs it
  can introduce. Consider:</p>
<p>一些人，包括一些练习书籍的作者，鼓励使用无符号数来表示不会为负的数。这被认为是一种自文档化。但在C中，这种文档化的好处都被它能引起的bug抵消掉了。考虑：</p>
<div>
  <p>for (unsigned int i = foo.Length()-1; i&gt;= 0; --i) ...</p>
</div>
<p>This code willnever terminate! Sometimes gcc will notice this bug and warn you, but often itwill not. Equally bad bugs can occur when comparing signed and unsignedvariables. Basically, C's type-promotion scheme causes unsigned types to behavedifferently
  than one might expect.</p>
<p>这段代码永远不会停止！有时gcc能找到这个错误并警告你，但通常找不到。同样糟糕的bug会在有符号数和无符号数比较时发生。基本上，C的类型提升机制会导致无符号数表现的和人们期待的不一样。</p>
<p>So, documentthat a variable is non-negative using assertions. Don't use an unsigned type.</p>
<p>所以，用断言来提醒变量是非负的。不要用无符号类型。</p>
<h2><a name="t32"></a><a name="64-bit_Portability">3.13 64-bitPortability</a> 64位下的可移植性</h2>
<p>Code should be64-bit and 32-bit friendly. Bear in mind problems of printing, comparisons, andstructure alignment.</p>
<p>代码应该同时兼容32位和64位。要考虑到打印、比较、以及结构体对齐等问题。</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;printf() specifiers for sometypes are not cleanly portable between 32-bit and 64-bit systems. C99 definessome portable format specifiers. Unfortunately, MSVC 7.1 does not understandsome of these specifiers and the standard is missing a few, so we have
  todefine our own ugly versions in some cases (in the style of the standardinclude file inttypes.h):</p>
<p>printf()中的一些类型的格式标识符在32位和64位系统下不完全兼容。C99定义了一些可移植的格式标识符。不幸的是，MSVC7.1不完全支持，标准中也遗漏了一部分，所以我们不得不自己定义一个丑陋的版本（用标准头文件inttypes.h的风格）。</p>
<div>
  <p>&nbsp;&nbsp;&nbsp; //printf macros for size_t, in the style of inttypes.h</p>
  <p>&nbsp;&nbsp;&nbsp;#ifdef _LP64</p>
  <p>&nbsp;&nbsp;&nbsp;#define __PRIS_PREFIX "z"</p>
  <p>&nbsp;&nbsp;&nbsp;#else</p>
  <p>&nbsp;&nbsp;&nbsp;#define __PRIS_PREFIX</p>
  <p>&nbsp;&nbsp;&nbsp;#endif</p>
  <p>&nbsp;</p>
  <p>&nbsp;&nbsp;&nbsp; //Use these macros after a % in a printf format string</p>
  <p>&nbsp;&nbsp;&nbsp; //to get correct 32/64 bit behavior, like this:</p>
  <p>&nbsp;&nbsp;&nbsp; //size_t size = records.size();</p>
  <p>&nbsp;&nbsp;&nbsp; //printf("%"PRIuS"\n", size);</p>
  <p>&nbsp;</p>
  <p>&nbsp;&nbsp;&nbsp;#define PRIdS __PRIS_PREFIX "d"</p>
  <p>&nbsp;&nbsp;&nbsp;#define PRIxS __PRIS_PREFIX "x"</p>
  <p>&nbsp;&nbsp;&nbsp;#define PRIuS __PRIS_PREFIX "u"</p>
  <p>&nbsp;&nbsp;&nbsp;#define PRIXS __PRIS_PREFIX "X"</p>
  <p>&nbsp;&nbsp;&nbsp;#define PRIoS __PRIS_PREFIX "o"</p>
</div>
<p>&nbsp;</p>
<div align="center">
  <table border="1" cellpadding="0" cellspacing="0">
    <tbody>
      <tr>
        <td>
          <p align="center">Type</p>
        </td>
        <td>
          <p align="center">DO NOT use</p>
        </td>
        <td>
          <p align="center">DO use</p>
        </td>
        <td>
          <p align="center">Notes</p>
        </td>
      </tr>
      <tr>
        <td>
          <p align="center">void *(any pointer)</p>
        </td>
        <td>
          <p align="center">%lx</p>
        </td>
        <td>
          <p align="center">%p</p>
        </td>
        <td>
          <p align="center">&nbsp;</p>
        </td>
      </tr>
      <tr>
        <td>
          <p align="center">int64_t</p>
        </td>
        <td>
          <p align="center">%qd, %lld</p>
        </td>
        <td>
          <p align="center">%"PRId64"</p>
        </td>
        <td>
          <p align="center">&nbsp;</p>
        </td>
      </tr>
      <tr>
        <td>
          <p align="center">uint64_t</p>
        </td>
        <td>
          <p align="center">%qu, %llu, %llx</p>
        </td>
        <td>
          <p align="center">%"PRIu64", %"PRIx64"</p>
        </td>
        <td>
          <p align="center">&nbsp;</p>
        </td>
      </tr>
      <tr>
        <td>
          <p align="center">size_t</p>
        </td>
        <td>
          <p align="center">%u</p>
        </td>
        <td>
          <p align="center">%"PRIuS", %"PRIxS"</p>
        </td>
        <td>
          <p align="center">C99 specifies %zu</p>
        </td>
      </tr>
      <tr>
        <td>
          <p align="center">ptrdiff_t</p>
        </td>
        <td>
          <p align="center">%d</p>
        </td>
        <td>
          <p align="center">%"PRIdS"</p>
        </td>
        <td>
          <p align="center">C99 specifies %zd</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<p>Note that thePRI* macros expand to independent strings which are concatenated by thecompiler. Hence if you are using a non-constant format string, you need toinsert the value of the macro into the format, rather than the name. It isstill possible, as usual,
  to include length specifiers, etc., after the % whenusing the PRI* macros. So, e.g. printf("x = %30"PRIuS"\n",x) would expand on 32-bit Linux to printf("x = %30" "u""\n", x), which the compiler will treat as printf("x =%30u\n", x).</p>
<p>注意到PRI开头的宏展开为了独立的字符串，编译器会<a>串联</a><a id="_anchor_39" href="#_msocom_39" name="_msoanchor_39">[f39]</a>&nbsp;起这些字符串。因此如果你用非常量的格式字符串，你需要将宏的值插入到其中，而不是宏的名字。通常用PRI宏后还是能在%后面加上长度标识的。例如，printf("x =%30"PRIuS"\n", x)在32位Linux下会被展开为printf("x = %30" "u""\n", x)，编译器会将其视为printf("x
  = %30u\n", x)。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;Remember that sizeof(void *) !=sizeof(int). Use intptr_t if you want a pointer-sized integer.</p>
<p>记住void*的大小不等于int的大小。如果你要用和指针一样大的整型，就用intptr_t。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;You may need to be careful withstructure alignments, particularly for structures being stored on disk. Anyclass/structure with a int64_t/uint64_t member will by default end up being8-byte aligned on a 64-bit system. If you have such structures being
  shared ondisk between 32-bit and 64-bit code, you will need to ensure that they arepacked the same on both architectures. Most compilers offer a way to alterstructure alignment. For gcc, you can use __attribute__((packed)). MSVC offers#pragma pack() and __declspec(align()).</p>
<p>&nbsp;&nbsp;&nbsp; Use the LL or ULL suffixes as needed tocreate 64-bit constants. For example:</p>
<p>在结构体对齐时你得小心点，尤其是要存到磁盘上的结构体。在64位系统上，任何包含int64_t/uint64_t成员的类/结构体默认都按8个字节对齐。如果你要在32位和64位的代码中共享使用存放在磁盘上的这种结构体，你需要确保它们在两种架构下都以同样的方式包装。大多数编译器都提供了改变结构体对齐的方法。GCC中你可以用__attribute__((packed))。MSVC中可以用#pragma pack()或__declspec(align())。需要创建64位常数时，在后面加上LL或ULL后缀。例如：</p>
<div>
  <p>&nbsp;&nbsp;&nbsp;int64_t my_value = 0x123456789LL;</p>
  <p>&nbsp;&nbsp;&nbsp;uint64_t my_mask = 3ULL &lt;&lt; 48;</p>
</div>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;If you really need differentcode on 32-bit and 64-bit systems, use #ifdef _LP64 to choose between the codevariants. (But please avoid this if possible, and keep any such changeslocalized.)</p>
<p>如果你在32位和64位系统下确实需要不同的代码，用_LP64宏来选择不同的代码。（但尽量不这么做，即使必须这么做也要尽量使改动局部化。）</p>
<h2><a name="t33"></a><a name="Preprocessor_Macros">3.14 PreprocessorMacros</a> 预处理宏</h2>
<p>Be very cautiouswith macros. Prefer inline functions, enums, and const variables to macros.</p>
<p><a>要谨慎对待宏</a><a id="_anchor_40" href="#_msocom_40" name="_msoanchor_40">[f40]</a>&nbsp;。用内联函数、枚举量、和常量来代替宏。</p>
<p>Macros mean thatthe code you see is not the same as the code the compiler sees. This canintroduce unexpected behavior, especially since macros have global scope.</p>
<p>使用宏就意味着你看到的代码和编译器最终看到的代码是不一样的。这会带来难以预料的行为，特别是因为宏是全局作用域生效的。</p>
<p>Luckily, macrosare not nearly as necessary in C++ as they are in C. Instead of using a macroto inline performance-critical code, use an inline function. Instead of using amacro to store a constant, use a const variable. Instead of using a macro to"abbreviate"
  a long variable name, use a reference. Instead of usinga macro to conditionally compile code ... well, don't do that at all (except,of course, for the #define guards to prevent double inclusion of header files).It makes testing much more difficult.</p>
<p>幸运的是，<a>在</a>C++中宏不像在C中那么重要<a id="_anchor_41" href="#_msocom_41" name="_msoanchor_41">[f41]</a>&nbsp;。不要用宏来展开性能要求高的代码，改用内联函数。不要用宏来存储一个常数，改用常量。不要用宏来为一个名字很长的变量起个较短的别名，改用引用。不要用宏来进行条件编译，改用……好吧，不要进行条件编译（除非是用#define来避免多次引入头文件）。用宏会导致很难进行测试。</p>
<p>Macros can dothings these other techniques cannot, and you do see them in the codebase,especially in the lower-level libraries. And some of their special features(like stringifying, concatenation, and so forth) are not available through thelanguage proper.
  But before using a macro, consider carefully whether there's anon-macro way to achieve the same result.</p>
<p>宏能做很多不可替代的工作，你可以在代码库，尤其是底层代码库中看到这些工作。而且宏的一些特性（如<a>字符串化</a><a id="_anchor_42" href="#_msocom_42" name="_msoanchor_42">[f42]</a>&nbsp;，文本串连，等等等等）无法通过语言特征来实现。但在用宏之前，要仔细考虑是否可以不用宏而达到相同的结果。</p>
<p>The followingusage pattern will avoid many problems with macros; if you use macros, followit whenever possible:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;Don't define macros in a .hfile.</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;#define macros right before youuse them, and #undef them right after.</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Do not just #undef an existingmacro before replacing it with your own; instead, pick a name that's likely tobe unique.</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;Try not to use macros thatexpand to unbalanced C++ constructs, or at least document that behavior well.</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;Prefer not using ## to generatefunction/class/variable names.</p>
<p>下面的使用模式能避免使用宏会带来的很多问题；如果你要用宏，就要尽量遵循这些准则：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;不要在<a>.h</a>文件<a id="_anchor_43" href="#_msocom_43" name="_msoanchor_43">[f43]</a>&nbsp;中定义宏。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;在马上要用到宏的地方才#define宏，用完立刻#undef。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;不要#undef一个现有的宏，仅仅因为自己的宏要用它的名字；不如为自己的宏取一个独特的名字。</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;不要用那些展开后会导致C++构造不稳定的宏，如果非要用，就在文档中说明。</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;不推荐使用<a>##</a><a id="_anchor_44" href="#_msocom_44" name="_msoanchor_44">[f44]</a>&nbsp;生成函数/类/变量的名字。</p>
<h2><a name="t34"></a><a name="0_and_nullptr/NULL">3.15 0 andnullptr/NULL</a> 0和空指针</h2>
<p>Use 0 for integers,0.0 for reals, nullptr (or NULL) for pointers, and '\0' for chars.</p>
<p>0用于整数，0.0用于浮点数，nullptr（不是NULL）用于指针，’\0’用于字符。</p>
<p>Use 0 forintegers and 0.0 for reals. This is not controversial.</p>
<p>0用于整数0.0用于浮点数，这是毫无疑问的。</p>
<p>For pointers(address values), there is a choice between 0 and NULL (and, for C++11,nullptr). For projects that allow C++11 features, use nullptr. For C++03projects, we prefer NULL because it looks like a pointer. In fact, some C++compilers provide special
  definitions of NULL which enable them to give usefulwarnings, particularly in situations where sizeof(NULL) is not equal tosizeof(0).</p>
<p>对于指针（地址值），可以选择用0或NULL（C++11中还能用nullptr）。对于遵循C++11特性的项目，要用nullptr。对于C++03的项目，<a>推荐用</a>NULL<a id="_anchor_45" href="#_msocom_45" name="_msoanchor_45">[f45]</a>&nbsp;，因为它看起来像指针。事实上，一些C++编译器提供了特殊的NULL定义，可以给出有帮助的警告信息，尤其是sizeof(NULL)不等于sizeof(0)的情况。</p>
<p>Use '\0' forchars. This is the correct type and also makes code more readable.</p>
<p>‘\0’用于字符。不仅类型正确，可读性也强。</p>
<h2><a name="t35"></a><a name="sizeof">3.16 sizeof</a> 类型大小</h2>
<p>Usesizeof(varname) instead of sizeof(type) whenever possible.</p>
<p>在可以的地方用sizeof(变量名)来代替sizeof(类型名)。</p>
<p>Usesizeof(varname) because it will update appropriately if the type of thevariable changes. sizeof(type) may make sense in some cases, but shouldgenerally be avoided because it can fall out of sync if the variable's typechanges.</p>
<p>用sizeof(变量名)是因为如果变量的类型改变了，它也能跟着更新。sizeof(类型名)在一些场合更有意义，但还是要避免这么用，因为变量类型改变后它没有跟着同步改变。</p>
<div>
  <p>Struct data;</p>
  <p>memset(&amp;data, 0, sizeof(data));//推荐的作法</p>
</div>
<p>&nbsp;</p>
<div>
  <p>memset(&amp;data, 0, sizeof(Struct));//不推荐的作法</p>
</div>
<h2><a name="t36"></a><a name="auto">3.17 auto</a> 自动识别类型</h2>
<p>Use auto toavoid type names that are just clutter. Continue to use manifest typedeclarations when it helps readability, and never use auto for anything butlocal variables.</p>
<p>用auto来避免使用混乱的类型名。继续在声明时使用显式的类型名，如果这么做能增强可读性的话。不要在局部变量之外的地方用auto。</p>
<p>Definition: </p>
<p>In C++11, avariable whose type is given as auto will be given a type that matches that ofthe expression used to initialize it. You can use auto either to initialize avariable by copying, or to bind a reference.</p>
<p>定义：</p>
<p>在C++11中，将变量类型设为auto就能<a>自动匹配</a><a id="_anchor_46" href="#_msocom_46" name="_msoanchor_46">[f46]</a>&nbsp;初始化表达式的类型。用auto也能通过复制或是绑定引用来初始化变量类型。</p>
<div>
  <p>vector&lt;string&gt; v;</p>
  <p>...</p>
  <p>auto s1 = v[0];&nbsp; // Makes a copy of v[0].</p>
  <p><a>const auto&amp;</a><span style="color:windowtext"><a id="_anchor_47" href="#_msocom_47" name="_msoanchor_47">[f47]</a>&nbsp;</span> s2 = v[0];&nbsp; // s2 is a reference to v[0].</p>
</div>
<p>Pros:</p>
<p>优点：</p>
<p>C++ type namescan sometimes be long and cumbersome, especially when they involve templates ornamespaces. In a statement like</p>
<p>C++的类型名有时又长又繁琐，尤其是里面包含模板和命名空间时。在这样的代码中</p>
<div>
  <p>sparse_hash_map&lt;string, int&gt;::iteratoriter = m.find(val);</p>
</div>
<p>the return typeis hard to read, and obscures the primary purpose of the statement. Changing itto</p>
<p>返回值的类型难以阅读，会导致语句的主要含义难以理解。把它改为：</p>
<div>
  <p>auto iter = m.find(val);</p>
</div>
<p>makes it morereadable.</p>
<p>可读性就大大增强了。</p>
<p>Without auto weare sometimes forced to write a type name twice in the same expression, addingno value for the reader, as in</p>
<p>不用auto有时我们被迫在同一个表达式中写两遍类型名，这对读者来说毫无价值，如：</p>
<div>
  <p>diagnostics::ErrorStatus* status = newdiagnostics::ErrorStatus("xyz");</p>
</div>
<p>Using auto makesit easier to use intermediate variables when appropriate, by reducing theburden of writing their types explicitly.</p>
<p>在适合的时候用auto能减少显式写出类型名的负担，方便了中间变量的使用。</p>
<p>Cons:</p>
<p>缺点：</p>
<p>Sometimes codeis clearer when types are manifest, especially when a variable's initializationdepends on things that were declared far away. In an expression like</p>
<p>有时明确写出类型名能令代码更清晰，尤其是变量的初始化依赖于在很远的地方声明的东西时。在这样的表达式中：</p>
<div>
  <p>auto i = x.Lookup(key);</p>
</div>
<p>it may not beobvious what i's type is, if x was declared hundreds of lines earlier.</p>
<p>如果x是在好几百行代码前声明的， i的类型就没那么显而易见。</p>
<p>Programmers haveto understand the difference between auto and const auto&amp; or they'll getcopies when they didn't mean to.</p>
<p>程序员需要懂得<a>auto</a>和const auto&amp;间的区别<a id="_anchor_48" href="#_msocom_48" name="_msoanchor_48">[f48]</a>&nbsp;，否则会在不想复制时出现复制。</p>
<p>The interactionbetween auto and C++11 brace-initialization can be confusing. (C++11brace-initialization isn't an approved feature, but this may become relevantwhen and if it is permitted.) The declarations</p>
<p>将auto和C++11中的大括号初始化式结合起来会迷惑人。（C++11的大括号初始化还没被接纳，但一旦通过了这两者很有可能用在一起。）下面两个声明</p>
<div>
  <p>auto x(3);&nbsp;// Note: parentheses.</p>
  <p>auto y{3};&nbsp;// Note: curly braces.</p>
</div>
<p>mean differentthings ― x is an int, while y is an initializer_list. The same applies to othernormally-invisible proxy types.</p>
<p>意思完全不同――x是int类型的，但y却是<a>initializer_list</a>类型<a id="_anchor_49" href="#_msocom_49" name="_msoanchor_49">[f49]</a>&nbsp;的。同样的情况也出现在其它隐式的代理类型中。</p>
<p>If an autovariable is used as part of an interface, e.g. as a constant in a header, thena programmer might change its type while only intending to change its value,leading to a more radical API change than intended.</p>
<p>如果一个auto类型的变量是接口的一部分，例如是头文件中的一个常数，程序员只是想修改一下它的值就可能改变了它的类型，导致比预期更激进的API改动。</p>
<p>Decision:</p>
<p>结论：</p>
<p>auto ispermitted, for local variables only. Do not use auto for file-scope ornamespace-scope variables, or for class members.</p>
<p>auto只允许用在局部变量上。不要将auto用在文件作用域或命名空间作用域的变量上，也不要用在类的成员变量上。</p>
<p>The auto keywordis also used in an unrelated C++11 feature: it's part of the syntax for a newkind of function declaration with a trailing return type. Function declarationswith trailing return types are not permitted.</p>
<p>auto关键字同样被用在了C++的另一个无关特性上：它是一种新的后置返回类型的函数声明语法的一部分。这个特性还没被接纳。</p>
<h2><a name="t37"></a><a name="Boost">3.18 Boost</a></h2>
<p>Use onlyapproved libraries from the Boost library collection.</p>
<p>只用Boost库集中被认可的部分。</p>
<p>Definition: </p>
<p>The Boost librarycollection is a popular collection of peer-reviewed, free, open-source C++libraries.</p>
<p>定义：</p>
<p>Boost库集是一个广受欢迎，经过同行鉴定，免费开源的C++库集。</p>
<p>Pros: </p>
<p>Boost code isgenerally very high-quality, is widely portable, and fills many important gapsin the C++ standard library, such as type traits, better binders, and bettersmart pointers. It also provides an implementation of the TR1 extension to thestandard
  library.</p>
<p>优点：</p>
<p>Boost的代码生成质量很高，可被广泛移植，填补了C++标准库的许多空白，如类型特性、更完善的绑定器、更好的智能指针。它也向标准库提供了一份<a>TR1</a><a id="_anchor_50" href="#_msocom_50" name="_msoanchor_50">[f50]</a>&nbsp;扩展的实现。</p>
<p>Cons: </p>
<p>Some Boost librariesencourage coding practices which can hamper readability, such asmetaprogramming and other advanced template techniques, and an excessively"functional" style of programming.</p>
<p>缺点：</p>
<p>一些Boost库鼓励妨碍可读性的编程实践，如元编程和其它高级模板技术，以及过度的函数式编程。</p>
<p>Decision:</p>
<p>结论：</p>
<p>In order tomaintain a high level of readability for all contributors who might read andmaintain code, we only allow an approved subset of Boost features. Currently,the following libraries are permitted:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;Call Traits fromboost/call_traits.hpp</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;Compressed Pair fromboost/compressed_pair.hpp</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Pointer Container fromboost/ptr_container except serialization and wrappers for containers not in theC++03 standard (ptr_circular_buffer.hpp and ptr_unordered*)</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;Array from boost/array.hpp</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;The Boost Graph Library (BGL)from boost/graph, except serialization (adj_list_serialize.hpp) andparallel/distributed algorithms and data structures (boost/graph/parallel/* andboost/graph/distributed/*).</p>
<p>6.&nbsp;&nbsp;&nbsp;&nbsp;Property Map fromboost/property_map, except parallel/distributed property maps (boost/property_map/parallel/*).</p>
<p>7.&nbsp;&nbsp;&nbsp;&nbsp;The part of Iterator that dealswith defining iterators: boost/iterator/iterator_adaptor.hpp,boost/iterator/iterator_facade.hpp, and boost/function_output_iterator.hpp</p>
<p>为了向所有阅读和维护代码的人员提供高可读性，我们只允许使用Boost中被认可的一个子集。目前，下列库是被认可的：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;类型特性：boost/call_traits.hpp。</p>
<p><a>2.&nbsp;&nbsp;&nbsp;&nbsp;压缩的pair</a><a id="_anchor_51" href="#_msocom_51" name="_msoanchor_51">[f51]</a>&nbsp;：boost/compressed_pair.hpp。</p>
<p><a>3.&nbsp;&nbsp;&nbsp;&nbsp;指针容器</a><a id="_anchor_52" href="#_msocom_52" name="_msoanchor_52">[f52]</a>&nbsp;：boost/ptr_container 除了序列化和容器包装类不在C++03标准中(ptr_circular_buffer.hpp和ptr_unordered*)。</p>
<p><a>4.&nbsp;&nbsp;&nbsp;&nbsp;Array</a><a id="_anchor_53" href="#_msocom_53" name="_msoanchor_53">[f53]</a>&nbsp;： boost/array.hpp</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;Boost图算法库BGL)：boost/graph，除了序列化（adj_list_serialize.hpp）、并行/分布式算法和数据结构（boost/graph/parallel/*和boost/graph/distributed/*）。</p>
<p><a>6.&nbsp;&nbsp;&nbsp;&nbsp;Property Map</a><a id="_anchor_54" href="#_msocom_54" name="_msoanchor_54">[f54]</a>&nbsp;：boost/property_map，除了parallel/distributed中的property_map (boost/property_map/parallel/*)。</p>
<p>7.&nbsp;&nbsp;&nbsp;&nbsp;Iterator中处理迭代器定义的部分：boost/iterator/iterator_adaptor.hpp， boost/iterator/iterator_facade.hpp，以及 boost/function_output_iterator.hpp。</p>
<p>We are activelyconsidering adding other Boost features to the list, so this rule may berelaxed in the future.</p>
<p>我们在积极考虑将其它Boost特性加入列表中，因此这条准则未来可能会改变。</p>
<h2><a name="t38"></a><a name="C++11">3.19 C++11</a></h2>
<p>Use onlyapproved libraries and language extensions from C++11 (formerly known asC++0x). Consider portability to other environments before using C++11 featuresin your project.</p>
<p>只使用C++11（也称为C++0x）中被认可的库和语言扩展。在用C++11特性前先考虑一下可移植性。</p>
<p>Definition: </p>
<p>C++11 is thelatest ISO C++ standard. It contains significant changes both to the languageand libraries.</p>
<p>定义：</p>
<p>C++11是最新的C++标准。它包括了许多意义重大的改变，从语言到库。</p>
<p>Pros: </p>
<p>C++11 has becomethe official standard, and eventually will be supported by most C++ compilers.It standardizes some common C++ extensions that we use already, allowsshorthands for some operations, and has some performance and safetyimprovements.</p>
<p>优点：</p>
<p>C++11已经成为了官方标准，最终会被大多数C++编译器支持。它将我们已经使用的一些C++扩展标准化了，简化了一些操作，并且有性能和安全性上的提高。</p>
<p>Cons:</p>
<p>缺点：</p>
<p>The C++11standard is substantially more complex than its predecessor (1,300 pages versus800 pages), and is unfamiliar to many developers. The long-term effects of somefeatures on code readability and maintenance are unknown. We cannot predictwhen its various
  features will be implemented uniformly by tools that may be ofinterest (gcc, icc, clang, Eclipse, etc.).</p>
<p>C++11标准明显要比它的前辈更复杂（1300页对800页），对许多开发者也不够友好。一些特性在可读性和可维护性上的长期表现尚属未知。我们无法预测何时各工具能有兴趣<a>一致的实现</a><a id="_anchor_55" href="#_msocom_55" name="_msoanchor_55">[f55]</a>&nbsp;它的各种特性。</p>
<p>As with Boost,some C++11 extensions encourage coding practices that hamper readability―forexample by removing checked redundancy (such as type names) that may be helpfulto readers, or by encouraging template metaprogramming. Other extensionsduplicate functionality
  available through existing mechanisms, which may leadto confusion and conversion costs.</p>
<p>和Boost一样，一些C++11的扩展也鼓励妨碍可读性的编程实践――例如去掉了可能对读者有帮助的<a>冗余检查</a><a id="_anchor_56" href="#_msocom_56" name="_msoanchor_56">[f56]</a>&nbsp;（例如类型名），或是鼓励模板元编程。其它的扩展通过现存的机制丰富了功能性，可能会迷惑人以及导致<a>转换开销</a><a id="_anchor_57" href="#_msocom_57" name="_msoanchor_57">[f57]</a>&nbsp;。</p>
<p>Decision: </p>
<p>结论：</p>
<p>Use only C++11libraries and language features that have been approved for use. Currently onlythe following C++11 features are approved:</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;auto (for local variablesonly).</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;Use of &gt;&gt; with nointervening space to close multiple levels of template arguments, as inset&lt;list&lt;string&gt;&gt;, where C++03 required a space as inset&lt;list&lt;string&gt; &gt;.</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Range-based for loops.</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;Use of the LL and ULL suffixeson numeric literals to guarantee that their type is at least 64 bits wide.</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;Variadic macros (but note thatuse of macros is discouraged).</p>
<p>6.&nbsp;&nbsp;&nbsp;&nbsp;All of the new STL algorithmsin the &lt;algorithm&gt; and &lt;numeric&gt; headers, except for the versionsof min, max, and minmax whose signatures contain initializer lists.</p>
<p>7.&nbsp;&nbsp;&nbsp;&nbsp;Use of local types as templateparameters.</p>
<p>8.&nbsp;&nbsp;&nbsp;&nbsp;nullptr and nullptr_t.</p>
<p>只用C++11中被认可的库和语言特性。当前只认可下列特性：</p>
<p>1.&nbsp;&nbsp;&nbsp;&nbsp;auto（只用于局部变量）。</p>
<p>2.&nbsp;&nbsp;&nbsp;&nbsp;“&gt;&gt;”现在优先匹配模板参数表的结束，而不是输出操作符。</p>
<p>3.&nbsp;&nbsp;&nbsp;&nbsp;以范围为基础的 for 循环</p>
<p>4.&nbsp;&nbsp;&nbsp;&nbsp;整数字面值+LL和ULL后缀以产生不少于64位的类型。</p>
<p>5.&nbsp;&nbsp;&nbsp;&nbsp;可变参数宏（但注意不鼓励用宏）。</p>
<p>6.&nbsp;&nbsp;&nbsp;&nbsp;所有声明于&lt;algorithm&gt;和&lt;numeric&gt;中的新STL算法，除了声明中包含初始化列表的min、max和minmax版本。</p>
<p><a>7.&nbsp;&nbsp;&nbsp;&nbsp;用局部类型充当模板参数</a><a id="_anchor_58" href="#_msocom_58" name="_msoanchor_58">[f58]</a>&nbsp;。</p>
<p>8.&nbsp;&nbsp;&nbsp;&nbsp;nullptr和nullptr_t</p>
<p>Other featureswill be approved individually as appropriate. Avoid writing code that isincompatible with C++11 (even though it works in C++03).</p>
<p>其它特性允许在个别时候适当使用。避免写与C++11不兼容的代码（在C++03中工作正常的也不行）。</p>
<div>
  <hr align="left" size="1" width="33%">
  <div>
    <div id="_com_1"><a name="_msocom_1"></a>
      <p>&nbsp;<a href="#_msoanchor_1">[f1]</a>派生类的构造过程中，基类构造时是不会调用派生类版本的虚函数的，因为此时派生类还没开始构造，这可能会迷惑一些人</p>
    </div>
  </div>
  <div>
    <div id="_com_2"><a name="_msocom_2"></a>
      <p>&nbsp;<a href="#_msoanchor_2">[f2]</a>新增一个子类后原有代码的含义可能被改变了</p>
    </div>
  </div>
  <div>
    <div id="_com_3"><a name="_msocom_3"></a>
      <p>&nbsp;<a href="#_msoanchor_3">[f3]</a>也可以增加一个成员标记用于指示对象是否已经初始化成功</p>
    </div>
  </div>
  <div>
    <div id="_com_4"><a name="_msocom_4"></a>
      <p>&nbsp;<a href="#_msoanchor_4">[f4]</a>将实质的初始化操作放入Init()方法中，它可以返回错误信息</p>
    </div>
  </div>
  <div>
    <div id="_com_5"><a name="_msocom_5"></a>
      <p>&nbsp;<a href="#_msoanchor_5">[f5]</a>比编译器版本的合理</p>
    </div>
  </div>
  <div>
    <div id="_com_6"><a name="_msocom_6"></a>
      <p>&nbsp;<a href="#_msoanchor_6">[f6]</a>同时也会允许作者没有预料到的各种转换，比如可以用int来构造对象的话，也同时允许了所有的内置类型，即使作者并不想这样</p>
    </div>
  </div>
  <div>
    <div id="_com_7"><a name="_msocom_7"></a>
      <p>&nbsp;<a href="#_msoanchor_7">[f7]</a>比如流的对象根本不允许复制，一些智能指针的复制还有特定含义，更要避免</p>
    </div>
  </div>
  <div>
    <div id="_com_8"><a name="_msocom_8"></a>
      <p>&nbsp;<a href="#_msoanchor_8">[f8]</a>要么不提供，要么都提供</p>
    </div>
  </div>
  <div>
    <div id="_com_9"><a name="_msocom_9"></a>
      <p>&nbsp;<a href="#_msoanchor_9">[f9]</a>struct默认成员都是public，适合于不需要封装的情况</p>
    </div>
  </div>
  <div>
    <div id="_com_10"><a name="_msocom_10"></a>
      <p>&nbsp;<a href="#_msoanchor_10">[f10]</a>尽量保持struct为POD对象，也是为了与C尽量兼容</p>
    </div>
  </div>
  <div>
    <div id="_com_11"><a name="_msocom_11"></a>
      <p>&nbsp;<a href="#_msoanchor_11">[f11]</a>类型特性</p>
    </div>
  </div>
  <div>
    <div id="_com_12"><a name="_msocom_12"></a>
      <p>&nbsp;<a href="#_msoanchor_12">[f12]</a>子类能覆盖基类的public非虚函数，但不能重载，只要子类定义一个自己版本的同名函数，基类中所有此名字的函数都失效了，需要带类名显式调用</p>
    </div>
  </div>
  <div>
    <div id="_com_13"><a name="_msocom_13"></a>
      <p>&nbsp;<a href="#_msoanchor_13">[f13]</a>即改为组合</p>
    </div>
  </div>
  <div>
    <div id="_com_14"><a name="_msocom_14"></a>
      <p>&nbsp;<a href="#_msoanchor_14">[f14]</a>有虚函数时如果析构函数非虚，一般编译器会有警告</p>
    </div>
  </div>
  <div>
    <div id="_com_15"><a name="_msocom_15"></a>
      <p>&nbsp;<a href="#_msoanchor_15">[f15]</a>有多个有实现的基类时，需要用虚基类来避免同一祖先产生多个内置对象</p>
    </div>
  </div>
  <div>
    <div id="_com_16"><a name="_msocom_16"></a>
      <p>&nbsp;<a href="#_msoanchor_16">[f16]</a>因为没有数据成员，本身只有一个状态</p>
    </div>
  </div>
  <div>
    <div id="_com_17"><a name="_msocom_17"></a>
      <p>&nbsp;<a href="#_msoanchor_17">[f17]</a>接口的祖先也都是接口</p>
    </div>
  </div>
  <div>
    <div id="_com_18"><a name="_msocom_18"></a>
      <p>&nbsp;<a href="#_msoanchor_18">[f18]</a>多个指针指向同一个对象</p>
    </div>
  </div>
  <div>
    <div id="_com_19"><a name="_msocom_19"></a>
      <p>&nbsp;<a href="#_msoanchor_19">[f19]</a>最明确的所有权就是不用指针，只用局部对象</p>
    </div>
  </div>
  <div>
    <div id="_com_20"><a name="_msocom_20"></a>
      <p>&nbsp;<a href="#_msoanchor_20">[f20]</a>编译器无法处理循环互指的情况</p>
    </div>
  </div>
  <div>
    <div id="_com_21"><a name="_msocom_21"></a>
      <p>&nbsp;<a href="#_msoanchor_21">[f21]</a>C++11中专门有unique_ptr来代替它</p>
    </div>
  </div>
  <div>
    <div id="_com_22"><a name="_msocom_22"></a>
      <p>&nbsp;<a href="#_msoanchor_22">[f22]</a>没有空引用，但有空指针</p>
    </div>
  </div>
  <div>
    <div id="_com_23"><a name="_msocom_23"></a>
      <p>&nbsp;<a href="#_msoanchor_23">[f23]</a>函数中有statci变量保存着对上次输入的指针。这里用指针是因为引用初始化后就没办法换指向了</p>
    </div>
  </div>
  <div>
    <div id="_com_24"><a name="_msocom_24"></a>
      <p>&nbsp;<a href="#_msoanchor_24">[f24]</a>只重写了一部分版本的时，其它基类函数不会自动被引入此作用域</p>
    </div>
  </div>
  <div>
    <div id="_com_25"><a name="_msocom_25"></a>
      <p>&nbsp;<a href="#_msoanchor_25">[f25]</a>alloca()是malloc.h中的函数，在栈上申请空间，不用free，不可移植，返回值不可传递。可用变长数组代替它。</p>
    </div>
  </div>
  <div>
    <div id="_com_26"><a name="_msocom_26"></a>
      <p>&nbsp;<a href="#_msoanchor_26">[f26]</a>比如覆盖掉了栈底的函数返回指令，有安全隐患</p>
    </div>
  </div>
  <div>
    <div id="_com_27"><a name="_msocom_27"></a>
      <p>&nbsp;<a href="#_msoanchor_27">[f27]</a>因为栈上申请的空间过大 被操作系统kill掉了</p>
    </div>
  </div>
  <div>
    <div id="_com_28"><a name="_msocom_28"></a>
      <p>&nbsp;<a href="#_msoanchor_28">[f28]</a>都是boost库中的成员</p>
    </div>
  </div>
  <div>
    <div id="_com_29"><a name="_msocom_29"></a>
      <p>&nbsp;<a href="#_msoanchor_29">[f29]</a>有些重载的操作符需要以友元的形式存在</p>
    </div>
  </div>
  <div>
    <div id="_com_30"><a name="_msocom_30"></a>
      <p>&nbsp;<a href="#_msoanchor_30">[f30]</a>例如：</p>
      <p>intret=func();</p>
      <p>if(ret==ERROR_0)</p>
      <p>&nbsp;&nbsp;&nbsp; …</p>
      <p>elseif(ret==ERROR_1)</p>
      <p>&nbsp;&nbsp;&nbsp; …</p>
    </div>
  </div>
  <div>
    <div id="_com_31"><a name="_msocom_31"></a>
      <p>&nbsp;<a href="#_msoanchor_31">[f31]</a>此处看不懂</p>
    </div>
  </div>
  <div>
    <div id="_com_32"><a name="_msocom_32"></a>
      <p>&nbsp;<a href="#_msoanchor_32">[f32]</a>是不是指空间占用？</p>
    </div>
  </div>
  <div>
    <div id="_com_33"><a name="_msocom_33"></a>
      <p>&nbsp;<a href="#_msoanchor_33">[f33]</a>我的理解是与之有一定共性的对象，如兄弟类等</p>
    </div>
  </div>
  <div>
    <div id="_com_34"><a name="_msocom_34"></a>
      <p>&nbsp;<a href="#_msoanchor_34">[f34]</a>而不是RTTI</p>
    </div>
  </div>
  <div>
    <div id="_com_35"><a name="_msocom_35"></a>
      <p>&nbsp;<a href="#_msoanchor_35">[f35]</a>为什么能用static_cast呢？</p>
    </div>
  </div>
  <div>
    <div id="_com_36"><a name="_msocom_36"></a>
      <p>&nbsp;<a href="#_msoanchor_36">[f36]</a>使你达不到想要的效果</p>
    </div>
  </div>
  <div>
    <div id="_com_37"><a name="_msocom_37"></a>
      <p>&nbsp;<a href="#_msoanchor_37">[f37]</a>含义很清晰</p>
    </div>
  </div>
  <div>
    <div id="_com_38"><a name="_msocom_38"></a>
      <p>&nbsp;<a href="#_msoanchor_38">[f38]</a><strong>ssize_t pread(int</strong><em>fd</em><strong>, void *</strong><em>buf</em><strong>, size_t</strong><em>count</em><strong>, off_t</strong><em>offset</em><strong>);</strong></p>
      <p>带偏移量地从文件中读取数据</p>
    </div>
  </div>
  <div>
    <div id="_com_39"><a name="_msocom_39"></a>
      <p>&nbsp;<a href="#_msoanchor_39">[f39]</a>这在 MSVC 6.0 上行不通, VC 6 编译器不会自动把引号间隔的多个字符串连接一个长字符串</p>
    </div>
  </div>
  <div>
    <div id="_com_40"><a name="_msocom_40"></a>
      <p>&nbsp;<a href="#_msoanchor_40">[f40]</a>本节的主要观点就是宏是在语言之外进行的文本替换，它不属于语言的一部分，很难在语言内调试出现的错误。尤其是如果有嵌套宏的话最终代码可能已经面目全非了，这时编译器检查出的错误就会令人匪夷所思。同时无法限制宏的作用域。</p>
    </div>
  </div>
  <div>
    <div id="_com_41"><a name="_msocom_41"></a>
      <p>&nbsp;<a href="#_msoanchor_41">[f41]</a>这是C++的一个很突出的改进思路</p>
    </div>
  </div>
  <div>
    <div id="_com_42"><a name="_msocom_42"></a>
      <p>&nbsp;<a href="#_msoanchor_42">[f42]</a>#的功能是将其后面的宏参数进行字符串化操作，简单说就是在它引用的宏变量的左右各加上一个双引号。</p>
    </div>
  </div>
  <div>
    <div id="_com_43"><a name="_msocom_43"></a>
      <p>&nbsp;<a href="#_msoanchor_43">[f43]</a>避免将宏扩散到所有用到它的.cc文件中</p>
    </div>
  </div>
  <div>
    <div id="_com_44"><a name="_msocom_44"></a>
      <p>&nbsp;<a href="#_msoanchor_44">[f44]</a><span style="color:black">##</span><span style="color:black">可以拼接符号</span></p>
    </div>
  </div>
  <div>
    <div id="_com_45"><a name="_msocom_45"></a>
      <p>&nbsp;<a href="#_msoanchor_45">[f45]</a>Bjarne Stroustrup 建议使用最原始的 0</p>
    </div>
  </div>
  <div>
    <div id="_com_46"><a name="_msocom_46"></a>
      <p>&nbsp;<a href="#_msoanchor_46">[f46]</a>使用<strong>auto</strong>并不改变代码的含义。代码仍然是静态类型</p>
    </div>
  </div>
  <div>
    <div id="_com_47"><a name="_msocom_47"></a>
      <p>&nbsp;<a href="#_msoanchor_47">[f47]</a><strong>auto不能自动推导成CV-qualifiers（constant &amp; volatile qualifiers），除非被声明为引用类型</strong></p>
    </div>
  </div>
  <div>
    <div id="_com_48"><a name="_msocom_48"></a>
      <p>&nbsp;<a href="#_msoanchor_48">[f48]</a><strong>int &amp;i=a;auto b=I;&nbsp; </strong></p>
      <p><strong>b的类型是int不是int&amp;</strong></p>
    </div>
  </div>
  <div>
    <div id="_com_49"><a name="_msocom_49"></a>
      <p>&nbsp;<a href="#_msoanchor_49">[f49]</a>大括号的类型是std::initializer_list即初始化列表，允许构造函数或其他函数像参数般地使用初始化列表，提供一个初始化列表构造函数后就可以用它构造了</p>
      <p>SomeClass(std::initializer_list&lt;int&gt; list);</p>
    </div>
  </div>
  <div>
    <div id="_com_50"><a name="_msocom_50"></a>
      <p>&nbsp;<a href="#_msoanchor_50">[f50]</a>03年通过的C++03标准中新增的扩展</p>
    </div>
  </div>
  <div>
    <div id="_com_51"><a name="_msocom_51"></a>
      <p>&nbsp;<a href="#_msoanchor_51">[f51]</a><span style="color:#020002">当</span><span style="color:#020002">compressed_pair</span><span style="color:#020002">的某一个模板参数为一个空类的时候将对其进行“空基类优化”，这样可以使得</span><span style="color:#020002">compressed_pair</span><span style="color:#020002">占用的空间比</span><span style="color:#020002">std::pair</span><span style="color:#020002">的更小。</span></p>
    </div>
  </div>
  <div>
    <div id="_com_52"><a name="_msocom_52"></a>
      <p>&nbsp;<a href="#_msoanchor_52">[f52]</a>Boost.pointer_container提供了和标准相似的容器,只是它存放的是指针,维护的是堆分配的对象.</p>
      <p>相比标准容器，能解决内存泄漏问题</p>
      <p>相比智能指针，开销更低，使用方便</p>
    </div>
  </div>
  <div>
    <div id="_com_53"><a name="_msocom_53"></a>
      <p>&nbsp;<a href="#_msoanchor_53">[f53]</a>提供固定大小容量的数组容器，性能可以和普通数组想媲美，使用方法类似于STL容器</p>
    </div>
  </div>
  <div>
    <div id="_com_54"><a name="_msocom_54"></a>
      <p>&nbsp;<a href="#_msoanchor_54">[f54]</a>Property_map是一个概念库而不是一个真正的实现。它引入了 property_map 概念以及property_map类型的一组要求，从而给出了对一个key和一个value的映射的语法和语义要求。这在需要声明必须支持的类型的泛型代 码中很有用。C++数组是一个property_map的例子。</p>
    </div>
  </div>
  <div>
    <div id="_com_55"><a name="_msocom_55"></a>
      <p>&nbsp;<a href="#_msoanchor_55">[f55]</a>不太懂，是不是说各工具的实现情况还不一致？</p>
    </div>
  </div>
  <div>
    <div id="_com_56"><a name="_msocom_56"></a>
      <p>&nbsp;<a href="#_msoanchor_56">[f56]</a>怀疑在说自动类型推断，auto和decltype</p>
    </div>
  </div>
  <div>
    <div id="_com_57"><a name="_msocom_57"></a>
      <p>&nbsp;<a href="#_msoanchor_57">[f57]</a>说的应该是将旧代码转成新特性的代码时的开销</p>
    </div>
  </div>
  <div>
    <div id="_com_58"><a name="_msocom_58"></a>
      <p>&nbsp;<a href="#_msoanchor_58">[f58]</a><a href="http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2657.htm">http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2657.htm</a></p>
      <p>大致意思是以前，未连接的类型（如函数内定义的类型，需要连接时才会确定布局）和无名字的类型（结构体和枚举类）是不能当模板参数的，现在取消了这条规定</p>
    </div>
  </div>
</div>
