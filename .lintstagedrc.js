module.exports = {
  // 只检查源代码文件，排除构建输出和依赖
  '*.{js,jsx,ts,tsx}': filenames => {
    const filteredFiles = filenames.filter(
      file =>
        !file.includes('.next/') &&
        !file.includes('node_modules/') &&
        !file.includes('out/') &&
        !file.includes('build/')
    );

    if (filteredFiles.length === 0) return [];

    return [
      `eslint --fix ${filteredFiles.join(' ')}`,
      `prettier --write ${filteredFiles.join(' ')}`,
    ];
  },
  '*.{json,css,md}': filenames => {
    const filteredFiles = filenames.filter(
      file =>
        !file.includes('.next/') &&
        !file.includes('node_modules/') &&
        !file.includes('out/') &&
        !file.includes('build/')
    );

    if (filteredFiles.length === 0) return [];

    return `prettier --write ${filteredFiles.join(' ')}`;
  },
};
