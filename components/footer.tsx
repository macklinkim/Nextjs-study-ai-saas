const Footer = () => {
  return (
    <footer className="w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-[#181818] dark:border-gray-700 ">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2024{" "}
        <a href="https://macklinkim.github.io/study/css_study/css_study_01_profile/" className="hover:underline">
          김천호 Production
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="https://github.com/macklinkim/" className="hover:underline me-4 md:me-6">
            Visit My GITHUB
          </a>
        </li>
        <li>
          <a href="/email" className="hover:underline">
            개발자에게 메일보내기
            <br/>
            kopsert@gmail.com
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;