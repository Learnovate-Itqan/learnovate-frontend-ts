import headerImage from "../../assets/books-coursesPage.jpg";

export function CoursesHeader() {
  return (
    <header className="relative flex justify-start items-center min-h-[calc(24rem-85px)] bg-gradient-to-br from-dark-navy via-dark-navy/90 text-white py-20">
      <div
        style={{ backgroundImage: `url(${headerImage})` }}
        className=" absolute inset-0 -z-10 bg-no-repeat bg-right bg-dark-navy bg-cover"
      />
      <main className="container flex flex-col justify-center items-start z-20">
        <h1 className="text-5xl font-semibold">Courses</h1>
        <p className="text-lg mt-4">Learn about the technological courses provided to you by Learnovate</p>
      </main>
    </header>
  );
}
