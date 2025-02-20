import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 md:py-0 border-t md:px-8 border-t-gray-800">
      <div className="md:h-24 flex flex-col md:flex-row items-center gap-4 justify-between">
        <p className="text-balance text-center text-sm leading-loose md:text-left text-muted-foreground">
          Built by{" "}
          <a
            href="https://hrishikeshsaha.com"
            target="_blank"
            className="underline underline-offset-4 font-medium transition-all duration-200 hover:text-blue-500"
          >
            Hrishikesh Saha
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/Hrishikesh-Saha/Netflix-Clone"
            target="_blank"
            className="underline underline-offset-4 font-medium hover:text-blue-500 transition-all duration-200"
          >
            Github
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
